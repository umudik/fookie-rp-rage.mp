module.exports = async function (ctx) {
    await ctx.test({
        name: "organise_inventory",
        function: async function (state) {
            const inventory = (await ctx.run({
                token: state.system_token,
                model: "inventory",
                method: "create",
                body: {
                    inventory_type: state.inventory_type[ctx.helpers.pk("inventory_type")],
                }
            })).data

            const gold = (await ctx.run({
                token: state.system_token,
                model: "item_type",
                method: "create",
                body: {
                    name: "gold",
                    weight: 0.1,
                    stack: 64,
                    image: "https://i.picsum.photos/id/112/200/200.jpg?hmac=a8Ve-HhSWAKC-SNBLKVosZ5gHmqMhgtNkPMYVMjEAbI"
                }
            })).data
            for (let i = 0; i < 10; i++) {
                const r = await ctx.run({
                    token: state.system_token,
                    model: "item",
                    method: "create",
                    body: {
                        item_type: gold[ctx.helpers.pk("item_type")],
                        inventory: inventory[ctx.helpers.pk("inventory")],
                        slot: i,
                        amount: 10
                    }
                })
            }


            const res = await ctx.run({
                token: state.system_token,
                model: "item",
                method: "read",
                query: {
                    filter: {
                        inventory: inventory[ctx.helpers.pk("inventory")],
                    }

                }
            })

            if (res.data.length != 2) {
                throw Error("oganise_inventory")
            }

        }
    })
}