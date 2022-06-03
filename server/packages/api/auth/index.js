module.exports = async function (ctx) {
    mp.events.add("playerQuit", async (player) => {
        const _id = player.getVariable("fookie_id");
        if (_id) {

            let res = await ctx.remote.update("player", _id, {
                spawned: false
            })
        }
    });

    mp.events.addProc("login", async (player, payload) => {
        const data = JSON.parse(payload)
        const res = await ctx.run({
            model: "player",
            method: "login",
            query: {
                filter: {
                    email: data.email,
                    password: data.password
                }
            },
            token: true,
        }, { player })

        if (res.status) {
            player.setVariable("token", res.data.token)
            player.setVariable("fookie_id", res.data._id)
            let res2 = await ctx.run({
                token: true,
                model: "player",
                method: "update",
                query: {
                    filter: {
                        _id: res.data._id
                    }
                },
                body: {
                    spawned: true
                }
            }, { player })
        }
        return res
    })

}


