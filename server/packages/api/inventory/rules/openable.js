module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "openable",
        function: async function (payload, ctx, state) {
            return true
        }
    })
}