module.exports = async function (ctx) {
    await ctx.use(require("./models/object.js"))
    await ctx.use(require("./models/object_type.js"))
}

