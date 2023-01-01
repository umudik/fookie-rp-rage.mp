module.exports = async function (ctx) {
    await ctx.test({
        name: "bootstrap",
        function: async function (state) {
            const seed = Date.now()
            const create_user_res = await ctx.run({
                model: "player",
                method: "create",
                token: state.system_token,
                body: {
                    email: "umut",
                    password: "umut"
                },
                options: {
                    dont_sync: true
                }
            })

            if (!create_user_res.status) {
                throw Error("Create User")
            }

            const login_user_res = await ctx.run({
                model: "player",
                method: "login",
                query: {
                    filter: {
                        email: "umut",
                        password: "umut",
                    }

                }
            })

            state.token = login_user_res.data.token
            state.user_id = create_user_res.data[ctx.helpers.pk("player")]
            console.log(state.token);
            console.log(state.user_id);

            state.players = []
            for (let i = 0; i < 5; i++) {
                const player = await ctx.run({
                    model: "player",
                    method: "create",
                    token: state.system_token,
                    body: {
                        email: `MOCK_PLAYER_${seed}_${Math.round(Math.random() * 100000)}`,
                        password: `MOCK_PASSWORD_${seed}_${Math.round(Math.random() * 100000)}`
                    },
                    options: {
                        dont_sync: true
                    }
                })

                if (!player.status) {
                    throw Error("Create User")
                }
                state.players.push(player.data)
            }
        }
    })
}