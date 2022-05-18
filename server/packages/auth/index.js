mp.events.add("fookie_connected", async (ctx) => {
    mp.events.add("playerJoin", async (player) => {
        const socialID = player.rgscId;
        player.dimension = mp.helpers.getEmptyDimension()
        player.outputChatBox("Your Social club ID is: " + socialID);
        setTimeout(() => {
            const id = player.getVariable("fookie_id");
            console.log(id);
            if (!id) {
                console.log("you are kicked");
            }
        }, 15 * 1000);
    })
})


