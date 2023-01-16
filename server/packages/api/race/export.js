
module.exports = async function (ctx) {
    await ctx.use(require("./models/race_type.js"))
    await ctx.use(require("./models/race.js"))
    await ctx.use(require("./models/race_type_point.js"))
    await ctx.use(require("./models/race_point.js"))
    await ctx.use(require("./models/race_player.js"))

    await ctx.use(require("./effect/race_end_effect.js"))
    await ctx.use(require("./effect/rp_is_end.js"))
    await ctx.use(require("./effect/race_start_effect.js"))

    await ctx.use(require("./rule/rp_last_is_checked.js"))
    await ctx.use(require("./rule/rp_race_is_started.js"))

    await ctx.use(require("./modify/rp_set_player.js"))



}