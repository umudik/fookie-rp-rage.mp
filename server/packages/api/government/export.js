module.exports = async function (ctx) {
    await ctx.use(require("./model/law_article"))
    await ctx.use(require("./model/punishment"))
    await ctx.use(require("./model/punishment_type"))
}