//let FookieJS = require('fookie');
const fookie = require("../../../fookie");

(async () => {
    await fookie.core()
    await fookie.init()

    await fookie.use(require("./entity/export"))
    await fookie.use(require("./character/export"))
    await fookie.use(require("./user/export"))
    await fookie.use(require("./vehicle/export"))
    await fookie.use(require("./inventory/export"))
    await fookie.use(require("./whitelist/export"))
    await fookie.use(require("./shop/export"))
    await fookie.use(require("./object/export"))
    await fookie.use(require("./crafting/export"))
    await fookie.use(require("./drop/export"))
    await fookie.use(require("./faction/export"))
    await fookie.use(require("./house/export"))
    await fookie.use(require("./interaction_menu/export"))
    await fookie.use(require("./government/export"))
    await fookie.use(require("./phone/export"))




    await fookie.listen(2626)




    mp.events.addProc('apiProc', async (player, payload) => {
        payload = JSON.parse(payload)
        payload.player = player
        await fookie.run(payload)
        return JSON.stringify(payload.response)
    })

    mp.events.call("fookie_connected")
})()


mp.events.addCommand("pos", (player) => {
    player.outputChatBox(player.position + " -pos")
})

mp.events.addCommand("dim", (player) => {
    player.outputChatBox(player.dimension + " -dim")
})

mp.events.addCommand('v', (player) => {
    mp.vehicles.new(mp.joaat("openwheel1"), player.position)
})




