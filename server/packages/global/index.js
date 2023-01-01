
mp.events.add("playerReady", async (player) => {
    if (!mp.accept_connections) {
        player.kick("Server is currently offline. Please try again later.")
        return
    }
    const socialID = player.rgscId;
    player.dimension = mp.helpers.getEmptyDimension()
    player.outputChatBox("Your Social club ID is: " + socialID);
    setTimeout(() => {
        const id = player.getVariable("fookie_id");
        console.log(player.getVariable("fookie_id"));
        if (!id) {
            player.kick("You are not registered");
        }
    }, 10 * 1000);
})

mp.events.addCommand("pos", (player) => {
    console.log(player.position);
    player.outputChatBox(player.position + "")
})

mp.events.addCommand("dim", (player) => {
    player.outputChatBox(player.dimension + "")
})