module.exports = async function (ctx) {
    await ctx.model(require("./models/faction.js"))
    await ctx.model(require("./models/member.js"))

    await ctx.run({
        token: process.env.SYSTEM_TOKEN,
        model: "faction",
        method: "create",
        body: {
            name: "LSPD",
        }
    })
}