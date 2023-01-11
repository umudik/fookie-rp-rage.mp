module.exports = async function (ctx) {
    await ctx.model({
        name: 'item_bomb',
        database: process.env.DATABASE,
        mixins: [],
        schema: {
            name: {
                type: "string",
                required: true,
                uniqueGroup: ["g1"]
            },
            item_type: {
                relation: "item_type",
                required: true,
                uniqueGroup: ["g1"]
            },
            chance: {
                type: "number",
                required: true,
            },
            min: {
                type: "number",
                required: true,
            },
            max: {
                type: "number",
                required: true,
            },

        },
        lifecycle: {
            create: {
                role: ["system"],
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
        }
    })

    ctx.helpers.createItemBomb = async function (name) {
        const bombs = (await ctx.run({
            token: process.env.SYSTEM_TOKEN,
            model: "item_bomb",
            method: "read",
            query: {
                filter: {
                    name
                }
            }
        })).data

        const response = []

        for (const bomb of bombs) {
            const rnd = Math.round(Math.random() * 100)
            if (rnd > bomb.chance) {
                const amount = Math.floor(Math.random() * (bomb.max - bomb.min + 1) + bomb.min)
                response.push({
                    item_type: bomb.item_type,
                    amount: amount
                })
            }

        }
        return response
    }
}