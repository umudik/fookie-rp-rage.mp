module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "has_items",
        function: async function (payload, ctx, state) {
            for (const ci of state.craft_ins) {
                const item = ctx.lodash.find(state.items, i => i.item_type === ci.item_type)
                if (item && item.amount < ci.amount) {
                    return false
                }
            }
            return true
        }
    })
}