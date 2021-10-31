module.exports = async function (ctx) {
    await ctx.use(require("./model/account"))
    await ctx.use(require("./model/contact"))
    await ctx.use(require("./model/messages"))
    await ctx.use(require("./model/phone"))
    await ctx.use(require("./model/twit"))
    await ctx.use(require("./model/yellowpage"))
}