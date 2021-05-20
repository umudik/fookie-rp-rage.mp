let FookieJS = require('../../../../html/api/src/index');


(async () => {
    mp.api = new FookieJS();
    await mp.api.connect('mongodb://localhost:27017/roleplay', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })


    await mp.api.model(require("../bank/models/atm.js"))
    await mp.api.model(require("../bank/models/atm_type.js"))
    await mp.api.model(require("../bank/models/bank.js"))
    await mp.api.model(require("../bank/models/bank_account.js"))
    await mp.api.model(require("../vehicle/models/vehicle.js"))
    await mp.api.model(require("../vehicle/models/vehicle_type.js"))

    await mp.api.model(require("../shop/models/shop.js"))
    await mp.api.model(require("../shop/models/shop_type.js"))
    await mp.api.model(require("../shop/models/shop_prices.js"))
    await mp.api.model(require("../pd/models/punishment"))
    await mp.api.model(require("../pd/models/punishment_type"))
    await mp.api.model(require("../inventory/models/inventory"))
    await mp.api.model(require("../inventory/models/inventory_type"))
    await mp.api.model(require("../inventory/models/item_type"))
    await mp.api.model(require("../inventory/models/item"))

    await mp.api.model(require("../interaction_menu/models/interaction_menu.js"))
    await mp.api.model(require("../entity/models/entity_type.js"))
    await mp.api.model(require("../entity/models/entity.js"))

    await mp.api.model(require("../drop/models/drop"))
    await mp.api.model(require("../drop/models/drop_type"))
    await mp.api.model(require("../crafting/models/craft"))
    await mp.api.model(require("../crafting/models/craft_in"))
    await mp.api.model(require("../crafting/models/craft_out"))
    await mp.api.model(require("../character/models/character.js"))

    mp.api.store.set("secret", "secret")
    mp.api.store.set("login", true)
    mp.api.store.set("register", true)
    mp.api.effect(require("../vehicle/effects/vehicle_sync.js"))
    mp.api.effect("rage_mp_sync", require('./effects/rage_mp_sync'))
    mp.api.store.set('afters', mp.api.store.get('afters').concat(["rage_mp_sync"]))
    mp.api.effect("rage_mp_entity_sync", require("../entity/effects/rage_mp_entity_sync.js"))
    mp.api.rule("has_slot", require("../inventory/rules/has_slot.js"))
    mp.api.rule("check_weight", require("../inventory/rules/check_weight.js"))
    mp.api.rule("openable", require("../inventory/rules/openable.js"))
    mp.api.rule("is_slot_avaible", require("../inventory/rules/is_slot_avaible.js"))
    mp.api.effect("item_in", require('../inventory/effects/item_in'))
    mp.api.effect("item_out", require('../inventory/effects/item_out'))



    await mp.api.listen(7777)
    mp.events.call("fookie_connected")
})()




mp.events.add("fookie_connected", async () => {





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




mp.events.addCommand("pos", (player) => {
    player.outputChatBox(player.position + " -pos")
})

mp.events.addCommand('v', (player) => {
    mp.vehicles.new(mp.joaat("formula"), player.position)
})

mp.events.addCommand('v2', (player) => {
    mp.vehicles.new(mp.joaat("turismor"), player.position)
})



