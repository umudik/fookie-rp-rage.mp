
module.exports = async function (ctx) {
    await ctx.use(require("./models/shop.js"))
    await ctx.use(require("./models/shop_item_price.js"))

    await ctx.use(require("./effect/shop_create_inventory.js"))

    await ctx.run({
        token: process.env.SYSTEM_TOKEN,
        model: "inventory_type",
        method: "create",
        body: {
            name: "shop",
            slotSize: 50,
            maxWeight: 100000,
        }
    })
}