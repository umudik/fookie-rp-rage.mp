let FookieJS = require('../../../../html/appgen/src/index')

mp.api = new FookieJS()
async function start() {
    await mp.api.connect('postgres://postgres:123@127.0.0.1:5432/roleplay')
    mp.api.model(require('../../fookie/models/Player'))
    mp.api.listen(7777)
}

start()


mp.api.effect('createObject', async({ user, model, method, result, ctx }) => {
    mp.objects.new(document.name, user.position)
})

mp.api.effect('notify', async({ user, model, method, result, ctx }) => {
    console.log("notify");
})

mp.events.addCommand('v', (player) => {
    mp.vehicles.new(mp.joaat("flashgt"), player.position)
})


mp.events.addProc('api', async(player, req) => {
    req = JSON.parse(req)
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