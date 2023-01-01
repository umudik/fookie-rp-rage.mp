module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "craft_items",
        wait: true,
        function: async function (payload, ctx, state) {
            for (const ci of state.craft_ins) {
                await ctx.helpers.removeItems(payload.body.inventory, ci.item_type, ci.amount)
            }
            for (const co of state.craft_outs) {
                await ctx.run({
                    token: process.env.SYSTEM_TOKEN,
                    model: "item",
                    method: "create",
                    body: {
                        inventory: payload.body.inventory,
                        item_type: co.item_type,
                        amount: co.amount
                    }
                })
            }
        }
    })
}