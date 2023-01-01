module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "has_slot",
        function: async function (payload, ctx, state) {
            if (payload.body.slot) {
                if (payload.method === "create") {
                    return state.inventory_type.slotSize > payload.body.slot
                }
                if (payload.method === "update") {
                    for (const item of state.items) {
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
                        if (inventory_type.slotSize > payload.body.slot) {
                            return false
                        }
                    }
                    return true
                }
                return false
            }
            return true
        }
    })
}