module.exports = async function (ctx) {
    await ctx.test({
        name: "player_inventory",
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

            const item_type = (await ctx.run({
                token: state.system_token,
                model: "item_type",
                method: "create",
                body: {
                    name: "item_1",
                    weight: 0.1,
                    stack: 10,
                }
            })).data

            await ctx.run({
                token: state.system_token,
                model: "item",
                method: "create",
                body: {
                    item_type: item_type[ctx.helpers.pk("item_type")],
                    inventory: player.inventory,
                    slot: 0,
                    amount: 6
                }
            })
            await ctx.run({
                token: state.system_token,
                model: "item",
                method: "create",
                body: {
                    item_type: item_type[ctx.helpers.pk("item_type")],
                    inventory: player.inventory,
                    slot: 0,
                    amount: 6
                }
            })

            const items = (await ctx.run({
                token: state.system_token,
                model: "item",
                method: "read",
                query: {
                    filter: {
                        inventory: player.inventory,
                    }

                }
            })).data

            if (items.length != 2) {
                throw Error("player inventory")
            }

        }
    })
}