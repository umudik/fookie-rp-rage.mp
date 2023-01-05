module.exports = async function (ctx) {
    await ctx.model(require("./models/bank_account.js"))
}