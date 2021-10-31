module.exports = async function (ctx) {
    await ctx.modify({
        name: "need_type",
        function: async function (payload) {
            return typeof payload.type == "object"
        }
    })
}