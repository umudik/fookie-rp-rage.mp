
module.exports = async function (ctx) {
    await ctx.use(require("./models/drop.js"))
    await ctx.use(require("./modify/drop_create_inventory.js"))

    await ctx.run({
        token: process.env.SYSTEM_TOKEN,
        model: "inventory_type",
        method: "create",
        body: {
            name: "drop",
            slotSize: 1,
            maxWeight: 100000,
        }
    })
}