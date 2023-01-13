module.exports = async function (ctx) {
    await ctx.test({
        name: "race",
        function: async function (state) {
            const player = (await ctx.run({
                token: state.system_token,
                model: "player",
                method: "read",
                query: {
                    filter: {
                        email: "umut"
                    }
                }
            })).data[0]

            const race_type = (await ctx.run({
                token: state.system_token,
                model: "race_type",
                method: "create",
                body: {
                    name: "race_type_1"
                }
            })).data



            const r1 = await ctx.run({
                token: state.system_token,
                model: "race_type_point",
                method: "create",
                body: {
                    race_type: race_type[ctx.helpers.pk("race_type")],
                    order: 0
                }
            })

            const r2 = await ctx.run({
                token: state.system_token,
                model: "race_type_point",
                method: "create",
                body: {
                    race_type: race_type[ctx.helpers.pk("race_type")],
                    order: 1
                }
            })

            const race = (await ctx.run({
                token: state.token,
                model: "race",
                method: "create",
                body: {
                    race_type: race_type[ctx.helpers.pk("race_type")],
                    owner: player[ctx.helpers.pk("player")],
                }
            })).data

            const race_player = (await ctx.run({
                token: state.token,
                model: "race_player",
                method: "create",
                body: {
                    race: race[ctx.helpers.pk("race")],
                    player: player[ctx.helpers.pk("player")],
                }
            })).data



            await ctx.run({
                token: state.token,
                model: "race",
                method: "update",
                query: {
                    filter: {
                        pk: race[ctx.helpers.pk("race")]
                    }
                },
                body: {
                    prepare: Date.now()
                }
            })

        }
    })
}