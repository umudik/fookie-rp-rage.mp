module.exports = async function (ctx) {
    await ctx.test({
        name: "create_item",
        function: async function (state) {
            const item_1_res = await ctx.run({
                token: state.system_token,
                model: "item",
                method: "create",
                body: {
                    item_type: state.item_type_1[ctx.helpers.pk("item_type")],
                    inventory: state.inventory_1[ctx.helpers.pk("inventory")],
                    slot: state.inventory_type.slotSize - 1,
                    amount: 200
                }
            })

            const item_2_res = await ctx.run({
                token: state.system_token,
                model: "item",
                method: "create",
                body: {
                    item_type: state.item_type_2[ctx.helpers.pk("item_type")],
                    inventory: state.inventory_1[ctx.helpers.pk("inventory")],
                    slot: state.inventory_type.slotSize - 1,
                    amount: 4
                }
            })

            if (!item_1_res.status || !item_2_res.status) throw Error("create item")
            state.item_1 = item_1_res.data
            state.item_2 = item_2_res.data

        }
    })
}