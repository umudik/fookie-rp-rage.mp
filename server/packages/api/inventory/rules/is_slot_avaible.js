module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "is_slot_avaible",
        function: async function (payload, ctx, state) {
            if (payload.method === "create") {
                let res = await ctx.run({
                    token: process.env.SYSTEM_TOKEN,
                    model: "item",
                    method: "count",
                    query: {
                        filter: {
                            inventory: payload.body.inventory,
                            slot: payload.body.slot,
                        }
                    }
                })
                return res.data == 0
            }
            if (payload.method === "update") {
                const res = await ctx.run({
                    token: process.env.SYSTEM_TOKEN,
                    model: "item",
                    method: "count",
                    query: {
                        filter: {
                            inventory: payload.body.inventory,
                            slot: {
                                $or: state.items.map(i => i[ctx.helpers.pk("item")])
                            }
                        }
                    }
                })
                return res.data === 0

            }
            return false
        }


    })
}