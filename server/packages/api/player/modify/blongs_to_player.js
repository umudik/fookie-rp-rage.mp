module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "belongs_to_player",
        function: async function (payload, ctx, state) {

            const paths = {
                [payload.model]: {}
            }




        }
    })
}