module.exports = async function (ctx) {
    await ctx.model(require("./models/faction.js"))
    await ctx.model(require("./models/member.js"))
}