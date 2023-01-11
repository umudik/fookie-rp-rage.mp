
module.exports = async function (ctx) {
    await ctx.use(require("./models/race_type.js"))
    await ctx.use(require("./models/race.js"))
    await ctx.use(require("./models/race_type_point.js"))
    await ctx.use(require("./models/race_score.js"))
    await ctx.use(require("./models/race_point.js"))
    await ctx.use(require("./models/race_player.js"))


}