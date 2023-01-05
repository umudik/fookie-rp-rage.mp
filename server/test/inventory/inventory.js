module.exports = async function (ctx) {
    await ctx.test({
        name: "inventory",
        function: async function (state) {
            const inventory_type_res = await ctx.run({
                token: state.system_token,
                model: "inventory_type",
                method: "create",
                body: {
                    name: "player",
                    slotSize: 10,
                    maxWeight: 20,
                }
            })
            if (!inventory_type_res.status) throw Error("inv type")
            const inventory_type = inventory_type_res.data
            state.inventory_type = inventory_type

            const inventory_1_res = await ctx.run({
                token: state.system_token,
                model: "inventory",
                method: "create",
                body: {
                    inventory_type: inventory_type[ctx.helpers.pk("inventory")]
                }
            })
            if (!inventory_1_res.status) throw Error("inv type")
            const inventory_1 = inventory_1_res.data
            state.inventory_1 = inventory_1

            const inventory_2_res = await ctx.run({
                token: state.system_token,
                model: "inventory",
                method: "create",
                body: {
                    inventory_type: inventory_type[ctx.helpers.pk("inventory")]
                }
            })
            if (!inventory_2_res.status) throw Error("inv type")
            const inventory_2 = inventory_2_res.data
            state.inventory_2 = inventory_2

        }
    })
}