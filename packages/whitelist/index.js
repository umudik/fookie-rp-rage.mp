mp.events.add("fookie_connected", () => {
  mp.api.model(require("./models/whitelist"))
})



mp.events.add("playerJoin", (player) => {
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
  if (res.data > 0) {
    player.call("api", ["st"])
  } else {
    player.kick("visit www.fookierp.com")
  }
})


mp.events.add("playerJoin", (player) => {
  player.dimension = -1
})