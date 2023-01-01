module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "set_type",
        function: async function (payload, ctx, state) {
            let et_res = await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "entity_type",
                method: "read",
                query: { filter: { model: payload.model } }
            })
            state.entity_type = et_res.data[0]
        }
    })
}