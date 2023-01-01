module.exports = async function (ctx) {
    await ctx.test({
        name: "move_item",
        function: async function (state) {
            const move_item_res = await ctx.run({
                token: state.system_token,
                model: "item",
                method: "update",
                query: {
                    filter: {
                        inventory: state.inventory_1[ctx.helpers.pk("inventory")],
                    }
                },
                body: {
                    inventory: state.inventory_2[ctx.helpers.pk("inventory")],
                    amount: 4

                }
            })
        }
    })
}