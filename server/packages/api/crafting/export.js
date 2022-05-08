module.exports = async function (ctx) {
    await ctx.use(require("./model/craft"))
    await ctx.use(require("./model/craft_in"))
    await ctx.use(require("./model/craft_out"))
    await ctx.use(require("./model/crafting_table"))
    await ctx.use(require("./model/crafting_table_type"))
}