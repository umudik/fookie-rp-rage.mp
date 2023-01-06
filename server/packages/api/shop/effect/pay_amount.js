module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "pay_amount",
        wait: true,
        function: async function (payload, ctx, state) {

            console.log("pay_amount");
        }
    })
}