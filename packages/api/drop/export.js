module.exports = async function (ctx) {
    await ctx.use(require("./model/drop"))
    await ctx.use(require("./model/drop_type"))
}