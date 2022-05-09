mp.events.add("playerJoin", async (player) => {
    player.dimension = mp.helpers.getEmptyDimension()
    player.setVariable("fookie_token", "admin")
})