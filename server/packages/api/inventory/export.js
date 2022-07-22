module.exports = async function (ctx) {
    await ctx.model(require("./models/inventory"))
    await ctx.model(require("./models/inventory_type"))
    await ctx.model(require("./models/item_type"))
    await ctx.model(require("./models/item"))
    await ctx.use(require("./rules/has_slot.js"))
    await ctx.use(require("./rules/check_weight.js"))
    await ctx.use(require("./rules/openable.js"))
    await ctx.use(require("./rules/is_slot_avaible.js"))
    await ctx.use(require('./effects/item_in'))
    await ctx.use(require('./effects/item_out'))
    await ctx.use(require('./modifies/set_inventory_and_type.js'))
    await ctx.use(require("./rules/valid_item_move_body.js"))
    await ctx.use(require("./rules/slot_fixer.js"))
    await ctx.use(require("./item_types/index.js"))
}



