module.exports = async function (ctx) {
    await ctx.test({
        name: "drop",
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

            const drop = (await ctx.run({
                token: state.token,
                model: "drop",
                method: "create",
                body: {}
            })).data


            const res = await ctx.run({
                token: state.token,
                model: "item",
                method: "update",
                query: {
                    filter: {

                    }
                },
                body: {
                    inventory: drop.inventory
                }
            })
            console.log(res);













        }
    })
}