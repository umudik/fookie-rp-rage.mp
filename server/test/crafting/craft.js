module.exports = async function (ctx) {
    await ctx.test({
        name: "crafting",
        function: async function (state) {
            const inventory = (await ctx.run({
                token: state.system_token,
                model: "inventory",
                method: "create",
                body: {
                    inventory_type: state.inventory_type[ctx.helpers.pk("inventory_type")],
                }
            })).data

            const stick = (await ctx.run({
                token: state.system_token,
                model: "item_type",
                method: "create",
                body: {
                    name: "stick",
                    weight: 0.2,
                    stack: 64,
                }
            })).data

            const diamond = (await ctx.run({
                token: state.system_token,
                model: "item_type",
                method: "create",
                body: {
                    name: "diamond",
                    weight: 0.5,
                    stack: 64,
                }
            })).data

            const sword = (await ctx.run({
                token: state.system_token,
                model: "item_type",
                method: "create",
                body: {
                    name: "sword",
                    weight: 1,
                    stack: 1,
                }
            })).data

            const item_stick = (await ctx.run({
                token: state.system_token,
                model: "item",
                method: "create",
                body: {
                    item_type: stick[ctx.helpers.pk("item_type")],
                    inventory: inventory[ctx.helpers.pk("inventory")],
                    slot: 0,
                    amount: 2
                }
            })).data

            const item_diamond = (await ctx.run({
                token: state.system_token,
                model: "item",
                method: "create",
                body: {
                    item_type: diamond[ctx.helpers.pk("item_type")],
                    inventory: inventory[ctx.helpers.pk("inventory")],
                    slot: 1,
                    amount: 2
                }
            })).data

            const craft_type = (await ctx.run({
                token: state.system_token,
                model: "craft_type",
                method: "create",
                body: {
                    name: "Diamond Sword"
                }
            })).data

            const in_1 = (await ctx.run({
                token: state.system_token,
                model: "craft_in",
                method: "create",
                body: {
                    craft_type: craft_type[ctx.helpers.pk("craft_type")],
                    item_type: stick[ctx.helpers.pk("item_type")],
                    amount: 1
                }
            })).data

            const in_2 = (await ctx.run({
                token: state.system_token,
                model: "craft_in",
                method: "create",
                body: {
                    craft_type: craft_type[ctx.helpers.pk("craft_type")],
                    item_type: diamond[ctx.helpers.pk("item_type")],
                    amount: 2
                }
            })).data


            const out = (await ctx.run({
                token: state.system_token,
                model: "craft_out",
                method: "create",
                body: {
                    craft_type: craft_type[ctx.helpers.pk("craft_type")],
                    item_type: sword[ctx.helpers.pk("item_type")],
                    amount: 1
                }
            })).data

            const craft = await ctx.run({
                token: state.system_token,
                model: "craft",
                method: "create",
                body: {
                    craft_type: craft_type[ctx.helpers.pk("craft_type")],
                    inventory: inventory[ctx.helpers.pk("inventory")],
                }
            })
        }
    })
}