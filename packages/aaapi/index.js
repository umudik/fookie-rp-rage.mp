let FookieJS = require('../../../../html/api/src/index')

mp.api = new FookieJS()
async function start() {
    await mp.api.connect('postgres://postgres:123@127.0.0.1:5432/roleplay')
    mp.api.use((ctx) => {
        ctx.store.set("secret", "secret")
        ctx.store.set("login", true)
        ctx.store.set("register", true)
    })
    mp.api.listen(7777)
}

start()


mp.api.effect('rage_mp_post', async (payload) => {
    console.log(payload.model.name);
})

mp.api.effect('notify', async ({ user, model, method, result, ctx }) => {
    console.log("notify");
})

mp.events.addCommand('v', (player) => {
    mp.vehicles.new(mp.joaat("flashgt"), player.position)
})


mp.events.addProc('api', async (player, payload) => {
    payload = JSON.parse(payload)
    console.log(`Model: ${payload.model} | Method: ${payload.method} `);
    let _payload = {
        user: { system: true },
        method: payload.method || "",
        body: payload.body || {},
        model: payload.model || "",
        query: payload.query || {},
        token: payload.token || "",
        options: payload.options || {},
    }

    let res = await mp.api.run(_payload)
    return JSON.stringify(res)
})































/*
mp.events.addProc('login', async(player, payload) => {
    let { email, password } = payload.body

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


mp.events.addProc('register', async(player, payload) => {
    let { email, password } = payload.body

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