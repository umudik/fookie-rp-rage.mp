module.exports = async function (ctx) {
  await ctx.use(require("./models/whitelist"))



}
