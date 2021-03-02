const { Sequelize, Op, CITEXT } = require('sequelize');
const { EventEmitter } = require('events')
const { clear } = require('./helpers')
const modelParser = require('./helpers/modelParser')
const findRequiredRoles = require('./helpers/requiredRoles');
const checkAuth = require('./helpers/checkAuth');

class AppGen extends EventEmitter {
    connection
    requester
    models
    roles
    effects
    paginate
    app
    jwt
    config
    routines
    httpServer
    io
    sequelize

    constructor(config) {
        super()
        this.config = config
        this.connection = null
        this.models = new Map()
        this.roles = new Map()
        this.effects = new Map()
        this.routines = new Map()
    }



    async role(name, role) {
        this.roles.set(name, role)
    }

    async model(model) {
        console.log('Model yaratılıyor')
        console.log(model);

        let ctx = this
        let roles = this.roles
        let models = this.models
        let config = this.config
        let effects = this.effects

        let Model = this.sequelize.define(model.name, model.schema)

        Model.get = async function({ user, query }) {
            let document = await Model.findOne(query)
            if (document instanceof Model) {
                return document.filter(user, 'get')
            } else {
                return false
            }
        }
        Model.getAll = async function({ user, query }) {
            let documents = await Model.findAll(query)
            if (documents[0] instanceof Model) {
                return documents.map(d => d.filter(user, 'get'))
            } else {
                return false
            }
        }

        Model.post = async function({ user, body }) {
            let document = Model.build(body)
            if (document.checkAuth(user, 'post', body)) {
                let tmp = await document.save()
                return await tmp.filter(user, 'post')
            } else {
                return false
            }
        }

        Model.delete = async function({ user, query }) {
            let document = await this.findOne(query)
            if (document instanceof Model) {
                if (document.checkAuth(user, 'delete', clear(document.toJSON()))) {
                    return await this.destroy(query)
                } else {
                    return false
                }
            } else {
                return false
            }
        }

        Model.patch = async function({ user, query, body }) {
            let document = await this.findOne(query)
            if (document.checkAuth(user, 'patch', body)) {
                for (let f in body) {
                    document[f] = body[f]
                }
                let tmp = await document.save()
                return await tmp.filter(user, 'get')
            } else {
                return false
            }
        }

        Model.pagination = async function({ user, query, body }) {

        }

        Model.options = async function({ user, body, query }) {
            let document = model.schema
            let method = body.method || 'patch'
            let r = {}
            let res = {}
            let keys = Object.keys(document)
            for (let i in keys) {
                let requiredRoles = findRequiredRoles(model, keys[i], method, 'auth')
                if (requiredRoles.every(role => roles.has(role))) {
                    let canAccess = requiredRoles.some(role => roles.get(role)(user, document))
                    if (canAccess) {
                        res[keys[i]] = document[keys[i]]
                    }
                } else {
                    throw new Error('invalid roles')
                }
            }
            r.fields = res
            r.appgen = model.appgen
            return r

        }

        Model.prototype.checkAuth = function(user, method, body) {
            let keys = Object.keys(body)
            return keys.some(key => checkAuth(user, body, model, key, method, roles, 'auth'))
        }

        Model.prototype.filter = function(user, method) {
            let document = clear(this.toJSON())
            let res = {}

            let keys = Object.keys(document)
            for (let i in keys) {
                checkAuth(user, document, model, keys[i], method, roles, 'auth', (doc, field) => {
                    res[keys[i]] = doc[keys[i]]
                })
            }
            res.updatedAt = this.updatedAt
            res.createdAt = this.createdAt
            res.id = this.id
            return res
        }

        Model.calcEffects = async function(user, method, result) {
            let keys = []
            if (result instanceof Model) {
                result = await result.filter(user, method)
                keys = Object.keys(result)
            }

            let effs = findRequiredRoles(model, "", 'post', 'effect')
            effs.concat(findRequiredRoles(model, "", 'delete', 'effect'))
            for (let i in keys) {
                let requiredEffects = findRequiredRoles(model, keys[i], method, 'effect')
                for (let r of requiredEffects) {
                    if (!effs.includes(r)) {
                        effs.push(r)
                    }
                }
            }
            if (effs.every(e => effects.has(e))) {
                effs.forEach(async(eff) => {
                    await effects.get(eff)(user, result, ctx)
                });
            }
        }


        await this.sequelize.sync({ alter: true })
        model.model = Model
        this.models.set(model.name, model)

        return Model
    }

    async effect(name, effect) {
        this.effects.set(name, effect)
    }

    async exec(user, Model, method, query = {}, body) {
        let result = await Model[method]({
            user,
            body,
            query
        })
        if (result) {
            Model.calcEffects(user, method, result)
            return result
        } else {
            return null
        }


    }

    async run(user, method, model, query, body) {
        if (this.models.has(model)) {
            let Model = this.models.get(model).model
            if (typeof Model[method] == 'function') {
                console.log(`[${method}] Model:${model} |  Query:${query}`);
                return await this.exec(user, Model, method, query, body)
            } else {
                console.log('Method yok');
                return null
            }
        } else {
            console.log('Model yok');
            return null
        }
    }

    async routine(name, time, func) {
        let API = this
        let routine = setInterval(() => {
            func(API)
        }, time);

        this.routines.set(name, routine)
    }

    async connect(url, config = {}) {
        this.sequelize = new Sequelize(url, {
            logging: false,
            define: {
                freezeTableName: true
            },
            operatorsAliases: {
                $eq: Op.eq, // = 3
                $ne: Op.ne, // != 20
                $is: Op.is, // IS NULL
                $not: Op.not, // IS NOT TRUE
                $or: Op.or, // (someAttribute = 5) OR (someAttribute = 6)      
                $col: Op.col, // = "user"."organization_id"          
                $gt: Op.gt, // > 6
                $gte: Op.gte, // >= 6
                $lt: Op.lt, // < 10
                $lte: Op.lte, // <= 10
                $between: Op.between, // BETWEEN 6 AND 10
                $notBetween: Op.notBetween, // NOT BETWEEN 11 AND 15          
                $in: Op.in, // IN [1, 2]
                $notIn: Op.notIn, // NOT IN [1, 2]          
                $like: Op.like, // LIKE '%hat'
                $notLike: Op.notLike, // NOT LIKE '%hat'
                $startsWith: Op.startsWith, // LIKE 'hat%'
                $endsWith: Op.endsWith, // LIKE '%hat'
                $substring: Op.substring, // LIKE '%hat%'
                $iLike: Op.iLike, // ILIKE '%hat' (case insensitive) (PG only)
                $notILike: Op.notILike, // NOT ILIKE '%hat'  (PG only)
                $regexp: Op.regexp, // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
                $notRegexp: Op.notRegexp, // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
                $iRegexp: Op.iRegexp, // ~* '^[h|a|t]' (PG only)
                $notIRegexp: Op.notIRegexp, // !~* '^[h|a|t]' (PG only)          
                $any: Op.any, // ANY ARRAY[2, 3]::INTEGER (PG only)

            }
        })
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');


        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
        await this.prepare()
    }

    async prepare() {
        let sm = await this.model(require('./defaults/system_model.js'))

        let model = await sm.findAll({
            where: {

            }
        })

        for (let m of model) {
            let parsedModel = modelParser(m.dataValues)
            await this.model(parsedModel)
        }

        this.role('everybody', () => {
            return true
        })
        this.role('nobody', () => {
                return false
            })
            /*
                    this.effect('sync', async(User, document, ctx) => {
                        let parsedModel = modelParser(document)
                        this.model(parsedModel)
                    })
            */
    }
}

module.exports = AppGen