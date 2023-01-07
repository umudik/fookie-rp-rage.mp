module.exports = async function (ctx) {
    await ctx.test({
        name: "bank",
        function: async function (state) {
            const inventory_type = await ctx.run({
                token: state.system_token,
                model: "inventory_type",
                method: "create",
                body: {
                    name: "bank",
                    slotSize: 1000,
                    maxWeight: 1000000,
                }
            })
            if (!inventory_type.status) throw Error("inv type")


            const inventory = await ctx.run({
                token: state.system_token,
                model: "inventory",
                method: "create",
                body: {
                    inventory_type: inventory_type.data[ctx.helpers.pk("inventory_type")]
                }
            })

            await ctx.run({
                token: state.system_token,
                model: "item",
                method: "create",
                body: {
                    inventory: inventory.data[ctx.helpers.pk("inventory")],
                    item_type: state.item_type_1[ctx.helpers.pk("item_type")],
                    amount: 450
                }
            })


            const res = await ctx.run({
                token: state.system_token,
                model: "bank_account",
                method: "create",
                body: {
                    inventory: inventory.data[ctx.helpers.pk("inventory")],
                    player: state.player_id
                }
            })
        }
    })
}