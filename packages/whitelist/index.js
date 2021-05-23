mp.events.add("fookie_connected", () => {
  mp.api.model(require("./models/whitelist"))
})
mp.api.helpers.getEmptyDimension = function () {
  for (; ;) {
    let dimension = Math.floor(Math.random() * 1000 * 1000) + 1
    let count = mp.players.toArray().filter(p => p.dimesion == dimension).length
    if (count == 0) {
      return dimension
    }
  }
}



mp.events.add("playerJoin", async (player) => {
  player.dimension = 0 //mp.api.helpers.getEmptyDimension()
  console.log(player.rgscId);
  let res = await mp.api.run({
    user: { system: true },
    method: "count",
    model: "whitelist",
    query: {
      where: {
        system_user: player._id
      }
    }
  })
  if (res.data > 0 || true) {
    player.call("api", ["st"])
  } else {
    player.kick("visit www.fookierp.com")
  }
})


mp.events.add("playerJoin", (player) => {

})