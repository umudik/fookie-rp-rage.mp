module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "craft_sets",
        function: async function (payload, ctx, state) {
            state.inventory = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "inventory",
                method: "read",
                query: {
                    filter: {
                        pk: payload.body.inventory
                    }
                }
            })).data[0]

            state.inventory_type = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "inventory_type",
                method: "read",
                query: {
                    filter: {
                        pk: state.inventory.inventory_type
                    }
                }
            })).data[0]

            state.craft_type = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "craft_type",
                method: "read",
                query: {
                    filter: {
                        pk: payload.body.craft_type
                    }
                }
            })).data[0]

            state.craft_ins = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "craft_in",
                method: "read",
                query: {
                    filter: {
                        craft_type: state.craft_type[ctx.helpers.pk("craft_type")]
                    }
                }
            })).data

            state.craft_outs = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "craft_out",
                method: "read",
                query: {
                    filter: {
                        craft_type: state.craft_type[ctx.helpers.pk("craft_type")]
                    }
                }
            })).data

            state.items = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item",
                method: "read",
                query: {
                    filter: {
                        inventory: payload.body.inventory,
                        item_type: {
                            $or: state.craft_ins.map(ci => ci.item_type)
                        }
                    }
                }
            })).data

        }
    })
}