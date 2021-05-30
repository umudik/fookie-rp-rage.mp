mp.events.add("fookie_connected", async () => {
    mp.api.model(require("./models/inventory"))
    mp.api.model(require("./models/inventory_type"))
    mp.api.model(require("./models/item_type"))
    mp.api.model(require("./models/item"))
    mp.api.rule("has_slot", require("./rules/has_slot.js"))
    mp.api.rule("check_weight", require("./rules/check_weight.js"))
    mp.api.rule("openable", require("./rules/openable.js"))
    mp.api.rule("is_slot_avaible", require("./rules/is_slot_avaible.js"))
    mp.api.effect("item_in", require('./effects/item_in'))
    mp.api.effect("item_out", require('./effects/item_out'))

    mp.api.modify("set_inventory_and_type", require('./modifies/set_inventory_and_type.js'))

    mp.api.rule("valid_item_move_body", require("./rules/valid_item_move_body.js"))
    mp.api.effect("slot_fixer", require("./rules/slot_fixer.js"))


    let item_model = mp.api.models.get("item")
    let inventory_model = mp.api.models.get("inventory")

    item_model.methods.set("move", (payload) => {
        console.log("move");
    })
})



