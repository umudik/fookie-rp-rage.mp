module.exports = async function (ctx) {
    await ctx.use(require("./utils/index"))

    await ctx.model(require("./models/inventory_type"))
    await ctx.model(require("./models/inventory"))
    await ctx.model(require("./models/item_type"))
    await ctx.model(require("./models/item"))
    await ctx.model(require("./models/item_type_event"))

    await ctx.use(require("./rules/has_slot.js"))
    await ctx.use(require("./rules/check_weight.js"))
    await ctx.use(require("./rules/find_items.js"))
    await ctx.use(require("./rules/openable.js"))
    await ctx.use(require("./rules/is_slot_avaible.js"))
    await ctx.use(require("./rules/check_item_amount.js"))
    await ctx.use(require('./effects/do_item_type_events'))
    await ctx.use(require('./effects/organise_inventory'))
    await ctx.use(require('./modifies/set_inventory_and_type.js'))
    await ctx.use(require("./modifies/slot_fixer.js"))
    await ctx.use(require("./defaults/index.js"))


}



