mp.events.add("playerJoin", async (player) => {
    player.dimension = mp.helpers.getEmptyDimension()
})