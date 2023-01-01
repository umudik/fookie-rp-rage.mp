module.exports = async function (ctx) {
    await ctx.use(require("./model/craft"))
    await ctx.use(require("./model/craft_in"))
    await ctx.use(require("./model/craft_out"))
    await ctx.use(require("./model/craft_type"))

    await ctx.use(require("./modify/craft_sets"))


    await ctx.use(require("./rule/has_items"))
    await ctx.use(require("./rule/control_weight"))
    await ctx.use(require("./rule/control_slot"))

    await ctx.use(require("./effect/craft_items"))


}