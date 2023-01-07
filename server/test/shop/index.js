module.exports = async function (ctx) {
    await ctx.test({
        name: "shop",
        function: async function (state) {
            const player = (await ctx.run({
                token: state.system_token,
                model: "player",
                method: "read",
                query: {
                    filter: {
                        email: "umut"
                    }
                }
            })).data[0]

            await ctx.run({
                token: state.system_token,
                model: "item",
                method: "create",
                body: {
                    inventory: player.inventory,
                    item_type: state.item_type_1[ctx.helpers.pk("item_type")],
                    amount: 50,
                }
            })

            const lemon = (await ctx.run({
                token: state.system_token,
                model: "item_type",
                method: "create",
                body: {
                    name: "lemon",
                    weight: 0.1,
                    stack: 10,
                    image: "https://i.picsum.photos/id/309/200/200.jpg?hmac=CV40Xz7anjWDJQgU2hAMvKhl5yWiUTCLTZqejhKkKs4"
                }
            })).data

            const shop_create = await ctx.run({
                token: state.system_token,
                model: "shop",
                method: "create",
                body: {
                    owner: state.player_id,
                    title: "MY Shop",
                }
            })
            if (!shop_create.status) {
                throw Error("shop")
            }

            const shop = (await ctx.run({
                token: state.system_token,
                model: "shop",
                method: "read",
                query: {
                    filter: {
                        pk: shop_create.data[ctx.helpers.pk("shop")]
                    }
                }
            })).data[0]


            await ctx.run({
                token: state.system_token,
                model: "shop_item_type_price",
                method: "create",
                body: {
                    shop: shop[ctx.helpers.pk("shop")],
                    item_type: lemon[ctx.helpers.pk("item_type")],
                    price: 2,
                    type: "buy"
                }
            })

            await ctx.run({
                token: state.system_token,
                model: "shop_item_type_price",
                method: "create",
                body: {
                    shop: shop[ctx.helpers.pk("shop")],
                    item_type: lemon[ctx.helpers.pk("item_type")],
                    price: 1,
                    type: "sell"
                }
            })


            await ctx.run({
                token: state.system_token,
                model: "item",
                method: "create",
                body: {
                    inventory: shop.inventory,
                    item_type: lemon[ctx.helpers.pk("item_type")],
                    amount: 10,
                }
            })

            const res1 = await ctx.run({
                token: state.token,
                model: "shop_transaction",
                method: "create",
                body: {
                    shop: shop[ctx.helpers.pk("shop")],
                    item_type: lemon[ctx.helpers.pk("item_type")],
                    amount: 10,
                    type: "buy"
                }
            })

            const res2 = await ctx.run({
                token: state.token,
                model: "shop_transaction",
                method: "create",
                body: {
                    shop: shop[ctx.helpers.pk("shop")],
                    item_type: lemon[ctx.helpers.pk("item_type")],
                    amount: 1,
                    type: "sell"
                }
            })


            const a = await ctx.helpers.itemsAmount(player.inventory, lemon[ctx.helpers.pk("item_type")])
            const b = await ctx.helpers.itemsAmount(player.inventory, state.item_type_1[ctx.helpers.pk("item_type")])

            if (a != 9 || b != 31) {
                throw Error("shop txn")
            }

        }
    })
}