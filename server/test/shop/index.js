module.exports = async function (ctx) {
    await ctx.test({
        name: "shop",
        function: async function (state) {
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

            const shop = await ctx.run({
                token: state.system_token,
                model: "shop",
                method: "create",
                body: {
                    owner: state.user_id,
                    title: "MY Shop",
                }
            })
            if (!shop.status) {
                throw Error("shop")
            }


            await ctx.run({
                token: state.system_token,
                model: "shop_item_type_price",
                method: "create",
                body: {
                    shop: shop.data[ctx.helpers.pk("shop")],
                    item_type: lemon[ctx.helpers.pk("item_type")],
                    price: 0.79,
                }
            })


            const res = await ctx.run({
                token: state.system_token,
                model: "item",
                method: "create",
                body: {
                    inventory: shop.data.inventory,
                    item_type: lemon[ctx.helpers.pk("item_type")],
                    amount: 25,
                }
            })

            console.log(res);


        }
    })
}