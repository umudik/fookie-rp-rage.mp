module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "shop_set_player",
        wait: true,
        function: async function (payload, ctx, state) {
            payload.body.player = state.player[ctx.helpers.pk("player")]
        }
    })
}