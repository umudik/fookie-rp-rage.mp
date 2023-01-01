module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "check_item_amount",
        function: async function (payload, ctx, state) {
            if (!payload.body.amount) {
                return true
            }

            if (payload.method === "create") {
                return state.item_type.stack >= payload.body.amount
            }
            if (payload.method === "update") {
                for (const item of state.items) {
                    const item_type = (await ctx.run({
                        token: process.env.SYSTEM_TOKEN,
                        method: "read",
                        model: "item_type",
                        query: {
                            filter: { pk: item.item_type }
                        }
                    })).data[0]
                    if (item_type.stack < payload.body.amount) {
                        return false
                    }
                }
                return true
            }
            return false
        }
    })
}