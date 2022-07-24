module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "check_weight",
        function: async function (payload, ctx, state) {
            let res = await ctx.run({
                token: true,
                method: "read",
                model: "item",
                query: {
                    filter: { inventory: payload.body.inventory }
                }
            })

            let items = res.data
            let total = 0

            for (let item of items) {
                console.log(item);
                const item_type_res = await ctx.run({
                    token: true,
                    method: "read",
                    model: "item_type",
                    query: {
                        filter: { pk: item.item_type }
                    }
                })

                const item_type = item_type_res.data[0]
                total += item.amount * item_type.weight
            }
            total += payload.body.amount * state.item_type.weight
            return state.inventory_type.maxWeight >= total
        }

    })

}