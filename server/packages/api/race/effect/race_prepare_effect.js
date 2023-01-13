module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "race_prepare_effect",
        wait: true,
        function: async function (payload, ctx, state) {
            if (payload.body.prepare) {
                console.log("prepare");
                for (const race of state.computed_data) {
                    // noktaları set et 
                    const players = (await ctx.run({
                        token: state.system_token,
                        model: "race_player",
                        method: "read",
                        query: {
                            filter: {
                                race: race[ctx.helpers.pk("race")],
                            }
                        }
                    })).data[0]

                    const points = (await ctx.run({
                        token: state.system_token,
                        model: "race_type_point",
                        method: "read",
                        query: {
                            filter: {
                                race_type: race.race_type,
                            }
                        }
                    })).data[0]

                    for (const player of players) {

                    }
                }

            }

        }
    })
}