module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "pay_amount_and_give_item",
        wait: true,
        function: async function (payload, ctx, state) {
            const price = state.shop_item_type_price.price * payload.body.amount
            await ctx.helpers.removeItems(state.buyer_bank_account.inventory, state.money[ctx.helpers.pk("item_type")], price)

            await ctx.helpers.removeItems(state.shop.inventory, payload.body.item_type, payload.body.amount)

            await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item",
                method: "create",
                body: {
                    inventory: state.seller_bank_account.inventory,
                    item_type: state.money[ctx.helpers.pk("item_type")],
                    amount: price,
                }
            })

            await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item",
                method: "create",
                body: {
                    inventory: state.player.inventory,
                    item_type: payload.body.item_type,
                    amount: payload.body.amount,
                }
            })

        }
    })
}