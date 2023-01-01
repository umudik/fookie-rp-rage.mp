module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "control_slot",
        function: async function (payload, ctx, state) {
            const items = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item",
                method: "read",
                query: {
                    filter: {
                        inventory: payload.body.inventory
                    }
                }
            })).data
            const need_slot = state.craft_outs.length - state.craft_ins.length

            if (state.craft_ins.length >= state.craft_outs.length) {
                return true
            } else {
                const na_slots = ctx.lodash.map(items, (item) => item.slot).sort((a, b) => a - b)
                const slots = ctx.lodash.range(0, state.inventory_type.slotSize)
                const free_slots = ctx.lodash.difference(slots, na_slots)
                if (free_slots.length < need_slot) {
                    return false
                }
            }
        }
    })
}