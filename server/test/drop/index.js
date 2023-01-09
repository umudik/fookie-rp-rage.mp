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
            const amount_1 = await ctx.helpers.itemsAmount(player.inventory, state.item_type_1[ctx.helpers.pk("item_type")],)
            const drop = (await ctx.run({
                token: state.token,
                model: "drop",
                method: "create",
                body: {}
            })).data


            await ctx.run({
                token: state.token,
                model: "move_item",
                method: "create",
                body: {
                    from: player.inventory,
                    to: drop.inventory,
                    item_type: state.item_type_1[ctx.helpers.pk("item_type")],
                    amount: 1
                }
            })


            const res = (await ctx.run({
                token: state.token,
                model: "item",
                method: "read",
                query: {
                    filter: {
                        inventory: drop.inventory,
                    }
                }
            })).data

            if (res.length === 0) {
                throw Error("drop inv")
            }

            const amount_2 = await ctx.helpers.itemsAmount(player.inventory, state.item_type_1[ctx.helpers.pk("item_type")])
            if (amount_1 - amount_2 != 1) {
                throw Error("drop amount")
            }

        }
    })
}