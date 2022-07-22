module.exports = async function (ctx) {
    await ctx.run({
        model: "item_type",
        method: "create",
        token: true,
        body: {
            name: "money",
            weight: 0.001,
            stack: 1000,
            description: "money",

        }
    })
}