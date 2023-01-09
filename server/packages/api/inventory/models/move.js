module.exports = async function (ctx) {
    await ctx.model({
        name: "move_item",
        database: process.env.DATABASE,
        mixins: [],
        schema: {
            from: {
                relation: "inventory",
                required: true,
            },
            to: {
                relation: "inventory",
                required: true,
            },
            item_type: {
                relation: "item_type",
                required: true,
            },
            amount: {
                required: true,
                type: "number",
                min: 1
            },
        },
        lifecycle: {
            create: {
                modify: [],
                rule: ["move_rule", "move_inventory_type_check"],
                role: ["system", "logged_in"],
                effect: ["move_effect"],
            },
            read: {
                role: ["everybody"],
            },
            update: {
                role: ["system"],
            },
            delete: {
                role: ["system"],
            },
            count: {
                role: ["system"],
            },
        }
    })

    await ctx.lifecycle({
        name: "move_rule",
        wait: true,
        function: async function (payload, ctx, state) {
            // envanterde item var mı 
            const amount = await ctx.helpers.itemsAmount(payload.body.from, payload.body.item_type)
            if (amount < payload.body.amount) {
                return false
            }

            // target'in envanterinde yer var mı 
            const item_test = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item",
                method: "test",
                body: {
                    inventory: payload.body.to,
                    item_type: payload.body.item_type,
                    amount: payload.body.amount,

                },
                options: {
                    method: "create"
                }
            })).data

            if (!item_test.status) {
                return false
            }
            return true
        }
    })

    await ctx.lifecycle({
        name: "move_inventory_type_check",
        wait: true,
        function: async function (payload, ctx, state) {
            const from_inventory = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "inventory",
                method: "read",
                query: {
                    filter: {
                        pk: payload.body.from,
                    }
                },

            })).data[0]

            const to_inventory = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "inventory",
                method: "read",
                query: {
                    filter: {
                        pk: payload.body.to,
                    }
                },

            })).data[0]


            const from_type = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "inventory_type",
                method: "read",
                query: {
                    filter: {
                        pk: from_inventory.inventory_type
                    }
                },

            })).data[0]

            const to_type = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "inventory_type",
                method: "read",
                query: {
                    filter: {
                        pk: to_inventory.inventory_type
                    }
                },

            })).data[0]

            if (to_type.name === "drop" && from_type.name !== "player") {
                return false
            }

            if (to_type.name === "player" && from_type.name !== "drop") {
                return false
            }

            if (state.user) {
                if (state.user.id != "" || state.user.id != "") {
                    //TODO
                }
            }

            return true
        }
    })

    await ctx.lifecycle({
        name: "move_effect",
        wait: true,
        function: async function (payload, ctx, state) {
            await ctx.helpers.removeItems(payload.body.from, payload.body.item_type, payload.body.amount)

            const item = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item",
                method: "create",
                body: {
                    inventory: payload.body.to,
                    item_type: payload.body.item_type,
                    amount: payload.body.amount
                },

            })).data
        }
    })
}
