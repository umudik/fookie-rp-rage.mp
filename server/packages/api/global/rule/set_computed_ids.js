module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "set_computed_ids",
        function: async function (payload, ctx, state) {
            const read_res = await ctx.run({
                token: true,
                model: payload.model,
                method: "read",
                query: payload.query
            })
            state.computed_ids = read_res.data.map(item => item._id)
            return true
        }
    })
}