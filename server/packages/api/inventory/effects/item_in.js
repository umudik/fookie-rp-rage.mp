module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "item_in",
        function: async function (payload, ctx, state) {
            console.log("item in");
        }
    })
}