module.exports = async function (ctx) {
    mp.events.add("playerQuit", async (player) => {
        const fookie_id = player.getVariable("fookie_id");
        if (fookie_id) {

            let res = await ctx.remote.update("player", fookie_id, {
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
            token: process.env.SYSTEM_TOKEN,
        }, { player })

        if (res.status) {
            player.setVariable("token", res.data.token)
            player.setVariable("fookie_id", res.data[ctx.helpers.pk("player")])
            let res2 = await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "player",
                method: "update",
                query: {
                    filter: {
                        pk: res.data[ctx.helpers.pk("player")]
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


