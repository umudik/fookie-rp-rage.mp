module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "race_end_effect",
        wait: true,
        function: async function (payload, ctx, state) {
            if (payload.body.end) {
                console.log("end");
            }
        }
    })
}