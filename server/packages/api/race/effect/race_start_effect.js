module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "race_start_effect",
        wait: true,
        function: async function (payload, ctx, state) {
            if (payload.body.start) {
                console.log("start");
            }
        }
    })
}