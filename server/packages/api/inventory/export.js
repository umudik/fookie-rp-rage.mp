module.exports = async function (ctx) {
    ctx.model(require("./models/inventory"))
    ctx.model(require("./models/inventory_type"))
    ctx.model(require("./models/item_type"))
    ctx.model(require("./models/item"))
    ctx.lifecycle("has_slot", require("./rules/has_slot.js"))
    ctx.lifecycle("check_weight", require("./rules/check_weight.js"))
    ctx.lifecycle("openable", require("./rules/openable.js"))
    ctx.lifecycle("is_slot_avaible", require("./rules/is_slot_avaible.js"))
    ctx.lifecycle("item_in", require('./effects/item_in'))
    ctx.lifecycle("item_out", require('./effects/item_out'))
    ctx.lifecycle("set_inventory_and_type", require('./modifies/set_inventory_and_type.js'))
    ctx.lifecycle("valid_item_move_body", require("./rules/valid_item_move_body.js"))
    ctx.lifecycle("slot_fixer", require("./rules/slot_fixer.js"))

}



