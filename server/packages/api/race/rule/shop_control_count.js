module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "shop_control_count",
        wait: true,
        function: async function (payload, ctx, state) {


            const count = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "shop",
                method: "count",
                query: {
                    filter: {
                        owner: payload.body.owner
                    }
                }

            })).data

            if (count > 0) {
                return false
            }

            return true
        }
    })
}