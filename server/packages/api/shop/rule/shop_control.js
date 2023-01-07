module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "shop_control",
        wait: true,
        function: async function (payload, ctx, state) {

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

            const shop_inventory = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "inventory",
                method: "read",
                query: {
                    filter: {
                        pk: shop.inventory
                    }
                }

            })).data[0]

            const inventory_type = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "inventory_type",
                method: "read",
                query: {
                    filter: {
                        pk: shop_inventory.inventory_type
                    }
                }

            })).data[0]

            if (inventory_type.name !== "shop") {
                return false
            }

            const shop_item_type_price = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "shop_item_type_price",
                method: "read",
                query: {
                    filter: {
                        shop: payload.body.shop,
                        item_type: payload.body.item_type,
                    }
                }

            })).data

            if (shop_item_type_price.length === 0) {
                console.log("Bu item bu shopta satilik değil.");
                return false
            }

            const buyer_bank_accounts = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "bank_account",
                method: "read",
                query: {
                    filter: {
                        player: payload.body.player
                    }
                }

            })).data

            if (buyer_bank_accounts.length === 0) {
                console.log("Banka hesabin yok");
                return false
            }

            const buyer_bank_account = buyer_bank_accounts[0]

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

            const player_inventory = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "inventory",
                method: "read",
                query: {
                    filter: {
                        pk: player.inventory
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

            const balance = await ctx.helpers.itemsAmount(buyer_bank_account.inventory, money[ctx.helpers.pk("item_type")])
            if (balance < shop_item_type_price.price * payload.body.amount) {
                console.log("Banka hesabında yeterli para yok");
                return false
            }

            const give_item_test = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item",
                method: "test",
                body: {
                    inventory: player.inventory,
                    item_type: payload.body.item_type,
                    amount: payload.body.amount,
                },
                options: {
                    method: "create"
                }

            })).data

            if (!give_item_test.status) {
                console.log("item verilemez");
                return false
            }

            const give_money_test = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item",
                method: "test",
                body: {
                    inventory: seller_bank_account.inventory,
                    item_type: money[ctx.helpers.pk("item_type")],
                    amount: shop_item_type_price[0].price * payload.body.amount,
                },
                options: {
                    method: "create"
                }

            })).data

            if (!give_money_test.status) {
                console.log("item verilemez");
                return false
            }

            state.shop_item_type_price = shop_item_type_price[0]
            state.buyer_bank_account = buyer_bank_account
            state.seller_bank_account = seller_bank_account
            state.money = money
            state.shop = shop
            state.player = player
            return true
        }
    })
}