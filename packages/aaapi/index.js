let FookieJS = require('fookie');

(async () => {
    mp.api = new FookieJS();
    await mp.api.connect('mongodb://127.0.0.1:27017/roleplay', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    await mp.api.listen(7777)
    mp.events.call("fookie_connected")
})()




mp.events.add("fookie_connected", async () => {
    mp.api.model(require("../bank/models/atm.js"))
    mp.api.model(require("../bank/models/atm_type.js"))
    mp.api.model(require("../bank/models/bank.js"))
    mp.api.model(require("../bank/models/bank_account.js"))
    mp.api.model(require("../vehicle/models/vehicle.js"))
    mp.api.model(require("../vehicle/models/vehicle_type.js"))
    mp.api.model(require("../shop/models/shop.js"))
    mp.api.model(require("../shop/models/shop_type.js"))
    mp.api.model(require("../shop/models/shop_prices.js"))
    mp.api.model(require("../pd/models/punishment"))
    mp.api.model(require("../pd/models/punishment_type"))
    mp.api.model(require("../interaction_menu/models/interaction_menu.js"))
    mp.api.model(require("../entity/models/entity_type.js"))
    mp.api.model(require("../entity/models/entity.js"))
    mp.api.model(require("../drop/models/drop"))
    mp.api.model(require("../drop/models/drop_type"))
    mp.api.model(require("../crafting/models/craft"))
    mp.api.model(require("../crafting/models/craft_in"))
    mp.api.model(require("../crafting/models/craft_out"))
    mp.api.model(require("../crafting/models/crafting_table"))
    mp.api.model(require("../character/models/character.js"))
    mp.api.store.set("secret", "secret")
    mp.api.store.set("login", true)
    mp.api.store.set("register", true)
    mp.api.effect(require("../vehicle/effects/vehicle_sync.js"))
    mp.api.effect("rage_mp_sync", require('./effects/rage_mp_sync'))
    mp.api.store.set('afters', mp.api.store.get('afters').concat(["rage_mp_sync"]))
    mp.api.effect("rage_mp_entity_sync", require("../entity/effects/rage_mp_entity_sync.js"))
})

mp.events.addProc('apiProc', async (player, payload) => {
    payload = JSON.parse(payload)
    payload.player = player
    console.log("--------- REQUEST ---------");
    await mp.api.run(payload)
    console.log("----------- END -----------");
    return JSON.stringify(payload.response)
})

mp.events.addCommand("pos", (player) => {
    player.outputChatBox(player.position + " -pos")
})

mp.events.addCommand("dim", (player) => {
    player.outputChatBox(player.dimension + " -dim")
})

mp.events.addCommand('v', (player) => {
    mp.vehicles.new(mp.joaat("openwheel1"), player.position)
})

mp.events.addCommand('v2', (player) => {
    mp.vehicles.new(mp.joaat("vstr"), player.position)
})



