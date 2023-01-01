module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "find_items",
        function: async function (payload, ctx, state) {
            const res = await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item",
                method: "read",
                query: payload.query
            })
            state.items = res.data
        }

    })

}