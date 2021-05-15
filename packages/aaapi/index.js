let FookieJS = require('../../../../html/api/src/index')

mp.api = new FookieJS()

mp.api.connect('postgres://postgres:123@127.0.0.1:5432/roleplay').then(async () => {

    mp.api.use((ctx) => {
        ctx.store.set("secret", "secret")
        ctx.store.set("login", true)
        ctx.store.set("register", true)
    })
    await mp.api.listen(7777)

    mp.api.use(async (ctx) => {
        ctx.effect("rage_mp_sync", require('./effects/rage_mp_sync'))
        ctx.store.set('afters', ctx.store.get('afters').concat(["rage_mp_sync"]))
    })

    mp.events.addCommand('v', (player) => {
        mp.vehicles.new(mp.joaat("formula"), player.position)
    })

    mp.events.addCommand('v2', (player) => {
        mp.vehicles.new(mp.joaat("turismor"), player.position)
    })

    mp.events.addProc('apiProc', async (player, payload) => {
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

        console.log("--------- REQUEST ---------");
        console.log(payload);
        console.log("----------- END -----------");
        await mp.api.run(_payload)
        return JSON.stringify(_payload.response)
    })
    mp.events.call("fookie_connected")
})


mp.events.addCommand("pos", (player) => {
    player.outputChatBox(player.position + " -pos")
})



