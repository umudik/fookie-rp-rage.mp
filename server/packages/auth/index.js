mp.events.add("playerQuit", async (player) => {
    const _id = player.getVariable("fookie_id");
    if (_id) {

        let res = await mp.fookie.remote.update("player", _id, {
            spawned: false
        })
    }
});

mp.events.add("playerJoin", async (player) => {
    const socialID = player.rgscId;
    player.dimension = mp.helpers.getEmptyDimension()
    player.outputChatBox("Your Social club ID is: " + socialID);
    setTimeout(() => {
        const id = player.getVariable("fookie_id");
        if (!id) {
            console.log("you are kicked");
            player.kick("You are not registered");
        }
    }, 15 * 1000);
})


mp.events.addProc("login", async (player, data) => {
    const payload = JSON.parse(data)
    const res = await mp.fookie.run({
        model: "player",
        method: "login",
        query: {
            filter: {
                email: payload.email,
                password: payload.password
            }
        },
        token: true,
    }, { player })
    if (res.status) {
        player.setVariable("token", res.data.token)
        player.setVariable("fookie_id", res.data._id)
        const p_data = await mp.fookie.remote.get("player", res.data._id)
        for (let f in p_data) {
            console.log(f);
            player[f] = data[f]
        }

    }

    return res
})

