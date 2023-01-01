module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "slot_fixer",
        function: async function (payload, ctx, state) {
            if (payload.body.slot) {
                return
            }

            let item_res = await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                method: "read",
                model: "item",
                query: {
                    filter: {
                        inventory: payload.body.inventory
                    }
                }
            })

            const na_slots = ctx.lodash.map(item_res.data, (item) => item.slot).sort((a, b) => a - b)
            const slots = ctx.lodash.range(0, state.inventory_type.slotSize)
            const free_slots = ctx.lodash.difference(slots, na_slots)

            if (free_slots.length === 0) {
                return false
            }

            //  payload.body.slot = free_slots[0]
        }
    })
}