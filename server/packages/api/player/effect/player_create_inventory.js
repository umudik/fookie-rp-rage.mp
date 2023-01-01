module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "player_create_inventory",
        function: async function (payload, ctx, state) {
            const inventory_type = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "inventory_type",
                method: "read",
                query: {
                    filter: {
                        name: "player"
                    }
                }
            })).data[0]

            const inventory = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "inventory",
                method: "create",
                body: {
                    inventory_type: inventory_type[ctx.helpers.pk("inventory_type")]
                }
            })).data

            await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "player",
                method: "update",
                query: {
                    filter: {
                        pk: payload.response.data[ctx.helpers.pk("player")]
                    }
                },
                body: {
                    inventory: inventory[ctx.helpers.pk("inventory")]
                }
            })
        },
    });
};
