module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "set_computed_data",
        function: async function (payload, ctx, state) {
            const read_res = await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: payload.model,
                method: "read",
                query: payload.query
            })
            state.computed_data = read_res.data
            return true
        }
    })
}