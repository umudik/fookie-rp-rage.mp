module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "check_weight",
        function: async function (payload, ctx, state) {
            if (payload.method === "create") {
                let total = await ctx.helpers.currentWeight(payload.body.inventory)
                total += payload.body.amount * state.item_type.weight
                return state.inventory_type.maxWeight >= total
            }

            if (payload.method === "update") {
                for (const item of state.items) {
                    let total = await ctx.helpers.currentWeight(item.inventory)

                    const item_type_res = await ctx.run({
                        token: process.env.SYSTEM_TOKEN,
                        method: "read",
                        model: "item_type",
                        query: {
                            filter: { pk: item.item_type }
                        }
                    })
                    const item_type = item_type_res.data[0]
                    if (payload.body.amount) {
                        total += payload.body.amount * item_type.weight
                        total -= item.amount * item_type.weight
                    } else {

                    }
                    total += item.amount * item_type.weight

                    const inventory = (await ctx.run({
                        token: process.env.SYSTEM_TOKEN,
                        method: "read",
                        model: "inventory",
                        query: {
                            filter: { pk: item.inventory }
                        }
                    })).data[0]

                    const inventory_type = (await ctx.run({
                        token: process.env.SYSTEM_TOKEN,
                        method: "read",
                        model: "inventory_type",
                        query: {
                            filter: { pk: inventory.inventory_type }
                        }
                    })).data[0]

                    if (inventory_type.maxWeight < total) {
                        return false
                    }
                }
                return true
            }
            return false
        }

    })

}

