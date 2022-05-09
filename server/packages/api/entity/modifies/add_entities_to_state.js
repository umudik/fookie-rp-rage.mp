module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "add_entities_to_state",
        function: async function (payload, ctx, state) {
            const entities_res = await ctx.run({
                token: true,
                model: payload.model,
                method: "read",
                query: payload.query
            })
            state.deleteEntities = entities_res.data
        }
    })
}
