module.exports = async function (ctx) {
    await ctx.run({
        model: "inventory_type",
        method: "create",
        token: process.env.SYSTEM_TOKEN,
        body: {
            name: "player_inventory",
            entity_type: "player",
            slotSize: 30,
            maxWeight: 300
        }
    })
    await ctx.run({
        model: "item_type",
        method: "create",
        token: process.env.SYSTEM_TOKEN,
        body: {
            name: "money",
            weight: 0.001,
            stack: 1000,
            description: "money",

        }
    })
}