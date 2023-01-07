module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "shop_txn_control",
        wait: true,
        function: async function (payload, ctx, state) {
            let buyyer_give_inventory = null
            let buyyer_payment_inventory = null
            let seller_payment_inventory = null
            let seller_give_inventory = null

            if (!["buy", "sell"].includes(payload.body.type)) {
                return false
            }

            const player = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "player",
                method: "read",
                query: {
                    filter: {
                        pk: payload.body.player
                    }
                }

            })).data[0]
            const money = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item_type",
                method: "read",
                query: {
                    filter: {
                        name: "money"
                    }
                }

            })).data[0]
            const shop = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "shop",
                method: "read",
                query: {
                    filter: {
                        pk: payload.body.shop
                    }
                }

            })).data[0]

            const shop_item_type_prices = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "shop_item_type_price",
                method: "read",
                query: {
                    filter: {
                        shop: payload.body.shop,
                        item_type: payload.body.item_type,
                        type: payload.body.type
                    }
                }

            })).data

            if (shop_item_type_prices.length === 0) {
                console.log("Bu item bu shopta satilik değil.");
                return false
            }
            const shop_item_type_price = shop_item_type_prices[0]


            let price = shop_item_type_price.price * payload.body.amount

            const seller_bank_accounts = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "bank_account",
                method: "read",
                query: {
                    filter: {
                        player: shop.owner
                    }
                }

            })).data

            if (seller_bank_accounts.length === 0) {
                console.log("Banka hesabi yok");
                return false
            }

            const seller_bank_account = seller_bank_accounts[0]

            if (payload.body.type === "buy") {
                buyyer_payment_inventory = player.inventory
                buyyer_give_inventory = player.inventory
                seller_payment_inventory = seller_bank_account.inventory
                seller_give_inventory = shop.inventory
            } else {
                buyyer_payment_inventory = seller_bank_account.inventory
                buyyer_give_inventory = shop.inventory
                seller_payment_inventory = player.inventory
                seller_give_inventory = player.inventory
            }


            const existed_item = await ctx.helpers.itemsAmount(seller_give_inventory, payload.body.item_type)

            if (existed_item < payload.body.amount) {
                console.log("yeterli item yok");
                return false
            }


            const buyyer_inventory_balance = await ctx.helpers.itemsAmount(buyyer_payment_inventory, money[ctx.helpers.pk("item_type")])

            if (buyyer_inventory_balance < price) {
                console.log("yeterli paran yok");
                return false
            }

            const give_item_test = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item",
                method: "test",
                body: {
                    inventory: buyyer_give_inventory,
                    item_type: payload.body.item_type,
                    amount: payload.body.amount,
                },
                options: {
                    method: "create"
                }

            })).data

            if (!give_item_test.status) {
                console.log("item test edildi verilemez");
                return false
            }

            const give_money_test = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item",
                method: "test",
                body: {
                    inventory: buyyer_payment_inventory,
                    item_type: money[ctx.helpers.pk("item_type")],
                    amount: price,
                },
                options: {
                    method: "create"
                }

            })).data

            if (!give_money_test.status) {
                console.log("item verilemez");
                return false
            }



            state.buyyer_give_inventory = buyyer_give_inventory
            state.buyyer_payment_inventory = buyyer_payment_inventory
            state.seller_payment_inventory = seller_payment_inventory
            state.seller_give_inventory = seller_give_inventory
            state.price = price
            state.money = money

            return true
        }
    })
}