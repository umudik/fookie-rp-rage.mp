//Models


mp.events.add("fookie_connected", async () => {
    await mp.api.model(require("./models/inventory"))
    await mp.api.model(require("./models/inventory_type"))
    await mp.api.model(require("./models/item_type"))
    await mp.api.model(require("./models/item"))
})


//Rules
mp.api.rule("has_slot", require("./rules/has_slot.js"))
mp.api.rule("check_weight", require("./rules/check_weight.js"))
mp.api.rule("openable", require("./rules/openable.js"))
mp.api.rule("is_slot_avaible", require("./rules/is_slot_avaible.js"))

//Effec

mp.api.effect("item_in", require('./effects/item_in'))
mp.api.effect("item_out",require('./effects/item_out'))