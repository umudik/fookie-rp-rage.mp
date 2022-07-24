module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "has_slot",
        function: async function (payload, ctx, state) {
            return state.inventory_type.slotSize > payload.body.slot
        }
    })
}