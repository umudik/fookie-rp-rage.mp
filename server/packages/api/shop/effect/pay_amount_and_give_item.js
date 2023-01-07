module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "pay_amount_and_give_item",
        wait: true,
        function: async function (payload, ctx, state) {
            await ctx.helpers.removeItems(state.buyyer_payment_inventory, state.money[ctx.helpers.pk("item_type")], state.price)

            await ctx.helpers.removeItems(state.seller_give_inventory, payload.body.item_type, payload.body.amount)

            await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item",
                method: "create",
                body: {
                    inventory: state.seller_payment_inventory,
                    item_type: state.money[ctx.helpers.pk("item_type")],
                    amount: state.price,
                }
            })

            await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item",
                method: "create",
                body: {
                    inventory: state.buyyer_give_inventory,
                    item_type: payload.body.item_type,
                    amount: payload.body.amount,
                }
            })

        }
    })
}