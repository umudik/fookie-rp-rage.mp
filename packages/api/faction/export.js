module.exports = async function (ctx) {
    await ctx.model(require("./models/faction.js"))
    await ctx.model(require("./models/faction_type.js"))
    await ctx.model(require("./models/member.js"))
    await ctx.model(require("./models/member_type.js"))

}