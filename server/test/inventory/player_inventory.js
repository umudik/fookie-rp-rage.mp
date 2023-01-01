module.exports = async function (ctx) {
    await ctx.test({
        name: "create_item",
        function: async function (state) {
            const player = (await ctx.run({
                token: state.system_token,
                model: "item_type",
                method: "read",
                query: {
                    filter: {
                        email: "umut"
                    }
                }
            })).data[0]

            const item_type = (await ctx.run({
                token: state.system_token,
                model: "item_type",
                method: "create",
                body: {
                    name: "item_1",
                    weight: 0.1,
                    stack: 10,
                }
            })).data

            const item = (await ctx.run({
                token: state.system_token,
                model: "item",
                method: "create",
                body: {
                    item_type: item_type[ctx.helpers.pk("item_type")],
                    inventory: player.inventory,
                    slot: 0,
                    amount: 11
                }
            })).data


        }
    })
}