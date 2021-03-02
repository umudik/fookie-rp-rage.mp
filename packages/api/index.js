let Api = require('../../api/src/index')

mp.api = new Api({
    login: true,
    register: true
})
async function start() {
    await mp.api.connect('postgres://postgres:123@127.0.0.1:5432/roleplay')


    mp.api.model(require('../../api/models/Player'))


    mp.api.effect('log', async (user, document, ctx) => {
        console.log("EFFECT LOG");
        console.log(document);
    })


    mp.api.effect('createObject', async (user, document, ctx) => {
        mp.objects.new(document.name, user.position)
    })

    mp.api.routine('hello', 1000 * 60 * 10, (ctx) => {
        console.log('heelo');
    })
}

start()


/*
mp.api.run({}, 'post', "system_application", {}, { title: "Object", icon: "mdi-tag" })
mp.api.run({}, 'post', "system_model", {}, { name: "player", sub: 1, application: 1, icon: "mdi-tag-outline" })
mp.api.run({}, 'post', "system_model", {}, { name: "vehicle", sub: 1, application: 1, icon: "mdi-tag-outline" })
mp.api.run({}, 'post', "system_model", {}, { name: "shop", sub: 1, application: 1, icon: "mdi-tag-outline" })
*/


mp.events.addProc('api', async (player, req) => {
    req = JSON.parse(req)
    console.log(req);
    let method = req.method || ""
    let body = req.body || {}
    let model = req.model || ""
    let query = req.query || {}
    let res = await mp.api.run(player, method, model, query, body)
    return JSON.stringify(res)
})





























/*
mp.events.addProc('login', async(player, req) => {
    let { email, password } = req.body

    if (mp.api.models.has('User')) {
        let Model = mp.api.models.get('User')
        let user = await Model.findOne({ where: { email, password: sha512(password) } })

        if (user instanceof Model && mp.api.config.login) {
            const token = jwt.sign({ id: user.id }, mp.api.config.secret);
            return { token, user: user.filter(user, 'get') }
        } else {
            return false
        }
    }
})


mp.events.addProc('register', async(player, req) => {
    let { email, password } = req.body

    if (mp.api.models.has('User') && mp.api.config.register) {
        let Model = mp.api.models.get('User')
        let user = await Model.findOne({ email, password: sha512(password) })
        if (user instanceof Model) {
            return false
        } else {
            user = await Model.create({ email, password })
            return user
        }
    }
})*/