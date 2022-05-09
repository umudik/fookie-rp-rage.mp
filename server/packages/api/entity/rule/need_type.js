module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "need_type",
        function: async function (payload, ctx, state) {
            return typeof state.entity_type == "object"
        }
    })
}