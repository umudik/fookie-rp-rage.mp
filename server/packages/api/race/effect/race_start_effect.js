module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "race_start_effect",
        wait: true,
        function: async function (payload, ctx, state) {
            if (payload.body.start > 0) {
                console.log("start in 2");
                for (const race of state.computed_data) {

                    // noktaları set et 
                    const race_players = await ctx.remote.all("race_player", {
                        query: {
                            filter: {
                                race: race[ctx.helpers.pk("race")],
                            }
                        }
                    })

                    const points = (await ctx.run({
                        token: process.env.SYSTEM_TOKEN,
                        model: "race_type_point",
                        method: "read",
                        query: {
                            filter: {
                                race_type: race.race_type,
                            }
                        }
                    })).data

                    setTimeout(async () => {
                        for (const race_player of race_players) {
                            for (const point of points) {
                                await ctx.run({
                                    token: process.env.SYSTEM_TOKEN,
                                    model: "race_point",
                                    method: "create",
                                    body: {
                                        race: race[ctx.helpers.pk("race")],
                                        race_type_point: point[ctx.helpers.pk("race_type_point")],
                                        player: race_player.player,
                                        achived: -1
                                    }
                                })
                            }
                        }
                    }, 2 * 1000);
                }

            }

        }
    })
}