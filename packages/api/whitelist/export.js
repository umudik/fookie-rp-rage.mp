module.exports = async function (ctx) {
  await ctx.use(require("./models/whitelist"))

  ctx.helpers.getEmptyDimension = function () {
    for (; ;) {
      let dimension = Math.floor(Math.random() * 1000 * 1000) + 1
      let count = mp.players.toArray().filter(p => p.dimesion == dimension).length
      if (count == 0) {
        return dimension
      }
    }
  }

}
