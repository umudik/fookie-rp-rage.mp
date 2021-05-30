mp.events.add("fookie_connected", async () => {
    mp.api.model(require("../inventory/models/inventory"))
    mp.api.model(require("../inventory/models/inventory_type"))
    mp.api.model(require("../inventory/models/item_type"))
    mp.api.model(require("../inventory/models/item"))
    mp.api.rule("has_slot", require("../inventory/rules/has_slot.js"))
    mp.api.rule("check_weight", require("../inventory/rules/check_weight.js"))
    mp.api.rule("openable", require("../inventory/rules/openable.js"))
    mp.api.rule("is_slot_avaible", require("../inventory/rules/is_slot_avaible.js"))
    mp.api.effect("item_in", require('../inventory/effects/item_in'))
    mp.api.effect("item_out", require('../inventory/effects/item_out'))



    mp.api.rule("valid_item_move_body", require("./rules/valid_item_move_body.js"))
    mp.api.effect("slot_fixer", require("./rules/slot_fixer.js"))


    let item_model = mp.api.models.get("item")
    let inventory_model = mp.api.models.get("inventory")

    item_model.methods.set("move", (payload) => {
        console.log("move");
    })
})



