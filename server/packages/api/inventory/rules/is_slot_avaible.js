module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "is_slot_avaible",
        function: async function (payload, ctx, state) {
            if (payload.method === "create") {
                const emptySlots = await ctx.helpers.emptySlots(payload.body.inventory)
                if (emptySlots.length == 0) {
                    return false
                }
                if (payload.body.slot) {
                    if (!lodash.includes(emptySlots, payload.body.slot)) {
                        payload.body.slot = emptySlots[0]
                    }
                }

                const needed_slot_size = Math.celil(payload.body.amount / state.item_type.stack)
                return needed_slot_size <= emptySlots.length
            }
            if (payload.method === "update") {
                const inventories = state.items.map(i => i.inventory)
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