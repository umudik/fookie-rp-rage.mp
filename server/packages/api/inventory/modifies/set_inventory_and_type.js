module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "set_inventory_and_type",
        function: async function (payload, ctx, state) {
            let res1 = await ctx.run({
                token: true,
                method: "get",
                model: "inventory",
                query: {
                    filter: { _id: payload.target.inventory }
                }
            })
            let inventory = res1.data

            res1 = await ctx.run({
                token: true,
                method: "get",
                model: "inventory_type",
                query: {
                    filter: { _id: inventory.inventory_type }
                }
            })
            let inventory_type = res1.data

            payload.inventory = inventory
            payload.inventory_type = inventory_type
        }
    })
}