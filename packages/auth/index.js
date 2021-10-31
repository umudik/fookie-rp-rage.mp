mp.events.add("playerJoin", async (player) => {
    player.dimension = ctx.helpers.getEmptyDimension()
    console.log(player.rgscId);
    let res = await ctx.run({
        system: true,
        method: "read",
        model: "whitelist",
        query: {
            rgscId: player.rgscId
        }
    })
    if (res.data.length > 0) {
        player.dimension = 0
    } else {
        player.kick("Only Whitelist")
    }
})