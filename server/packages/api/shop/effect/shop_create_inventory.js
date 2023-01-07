module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "shop_create_inventory",
        wait: true,
        function: async function (payload, ctx, state) {
            const shop_it = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "inventory_type",
                method: "read",
                query: {
                    filter: {
                        name: "shop"
                    }
                }
            })).data[0]

            const inventory = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "inventory",
                method: "create",
                body: {
                    inventory_type: shop_it[ctx.helpers.pk("inventory_type")]
                }
            })).data

            await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "shop",
                method: "update",
                query: {
                    filter: {
                        pk: payload.response.data[ctx.helpers.pk("shop")]
                    }
                },
                body: {
                    inventory: inventory[ctx.helpers.pk("inventory")]
                }
            })

            payload.response.data.inventory = inventory[ctx.helpers.pk("inventory")]
        }
    })
}