module.exports = async function (ctx) {
    ctx.model(require("./models/inventory"))
    ctx.model(require("./models/inventory_type"))
    ctx.model(require("./models/item_type"))
    ctx.model(require("./models/item"))
    ctx.rule("has_slot", require("./rules/has_slot.js"))
    ctx.rule("check_weight", require("./rules/check_weight.js"))
    ctx.rule("openable", require("./rules/openable.js"))
    ctx.rule("is_slot_avaible", require("./rules/is_slot_avaible.js"))
    ctx.effect("item_in", require('./effects/item_in'))
    ctx.effect("item_out", require('./effects/item_out'))
    ctx.modify("set_inventory_and_type", require('./modifies/set_inventory_and_type.js'))
    ctx.rule("valid_item_move_body", require("./rules/valid_item_move_body.js"))
    ctx.effect("slot_fixer", require("./rules/slot_fixer.js"))

}



