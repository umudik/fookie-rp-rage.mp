
module.exports = async function (ctx) {
    await ctx.use(require("./models/shop.js"))
    await ctx.use(require("./models/shop_item_type_price.js"))

    await ctx.use(require("./rule/shop_control"))

    await ctx.use(require("./effect/shop_create_inventory.js"))
    await ctx.use(require("./effect/pay_amount"))

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

    const item = ctx.local.get("model", "item")
    item.lifecycle.update.effect.push("pay_amount")
    item.lifecycle.update.rule.push("shop_control")


    await ctx.run({
        token: process.env.SYSTEM_TOKEN,
        model: "model",
        method: "update",
        query: {
            filter: {
                name: "item"
            }
        },
        body: {
            lifecycle: item.lifecycle
        }
    })
}