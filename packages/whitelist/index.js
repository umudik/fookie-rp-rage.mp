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
  player.dimension = mp.api.helpers.getEmptyDimension()
  console.log(player.rgscId);
  let res = await mp.api.run({
    user: { system: true },
    method: "get",
    model: "whitelist",
    query: {
      where: {
        rgscId: player.rgscId
      }
    }
  })
  let whiteListed = res.data
  if (whiteListed) {
    player.dimension = 0
    let res = await mp.api.run({
      user: { system: true },
      method: "get",
      model: "system_user",
      query: {
        where: {
          _id: whiteListed.system_user
        }
      }
    })
    let user = res.data

    player.setVariable("user", user)
    player.call("commit", ["obj"])
  } else {
    player.kick("visit www.fookierp.com")
  }
})


mp.events.add("playerJoin", (player) => {

})