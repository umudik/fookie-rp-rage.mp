module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "control_weight",
        function: async function (payload, ctx, state) {
            const inventory_weight = await ctx.helpers.currentWeight(payload.body.inventory)
            let ci_weight = 0
            let co_weight = 0

            for (const ci of state.craft_ins) {
                const item_type = (await ctx.run({
                    token: process.env.SYSTEM_TOKEN,
                    model: "item_type",
                    method: "read",
                    query: {
                        filter: {
                            pk: ci.item_type
                        }
                    }
                })).data[0]

                ci_weight += item_type.weight * ci.amount
            }

            for (const co of state.craft_outs) {
                const item_type = (await ctx.run({
                    token: process.env.SYSTEM_TOKEN,
                    model: "item_type",
                    method: "read",
                    query: {
                        filter: {
                            pk: co.item_type
                        }
                    }
                })).data[0]

                co_weight += item_type.weight * co.amount
            }

            return state.inventory_type.maxWeight >= inventory_weight - ci_weight + co_weight
        }
    })
}