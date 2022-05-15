module.exports = async function (ctx) {
    await ctx.use(require("./rule/set_computed_data.js"))
}