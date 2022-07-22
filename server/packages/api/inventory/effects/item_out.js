module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "item_out",
        function: async function (payload, ctx, state) {
            console.log("item out");
        }
    })
}