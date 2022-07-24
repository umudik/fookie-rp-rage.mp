module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "set_inventory_and_type",
        function: async function (payload, ctx, state) {

            const item_type_res = await ctx.run({
                token: true,
                method: "read",
                model: "item_type",
                query: {
                    filter: { pk: payload.body.item_type }
                }
            })
            if (item_type_res.data.length > 0) {
                state.item_type = item_type_res.data[0]
            }

            const inventory_res = await ctx.run({
                token: true,
                method: "read",
                model: "inventory",
                query: {
                    filter: { pk: payload.body.inventory }
                }
            })

            state.inventory = inventory_res.data[0]

            const inventory_type_res = await ctx.run({
                token: true,
                method: "read",
                model: "inventory_type",
                query: {
                    filter: { pk: state.inventory.inventory_type }
                }
            })

            if (inventory_type_res.data.length > 0) {
                state.inventory_type = inventory_type_res.data[0]
            }
        }
    })
}