module.exports = async function (ctx) {
    await ctx.test({
        name: "entity",
        function: async function (state) {
            const res = (await ctx.run({
                token: state.system_token,
                model: "entity_type",
                method: "read",
            })).data
        }
    })
}