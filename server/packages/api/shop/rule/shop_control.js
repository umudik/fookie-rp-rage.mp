module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "shop_control",
        wait: true,
        function: async function (payload, ctx, state) {

            console.log("shop_control");
        }
    })
}