module.exports = async function (ctx) {
    await ctx.use(require("./model/marker_type.js"))
    await ctx.use(require("./model/marker.js"))
}
