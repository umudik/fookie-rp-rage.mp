module.exports = async function (ctx) {
    await ctx.model({
        name: 'craft_out',
        database: "mongodb",
        schema: {
            craft: {
                relation: "craft",
                required: true,
            },
            item_type: {
                relation: "item_type",
                required: true,
            },
            amount: {
                required: true,
                type: "number",
                default: 1
            },
            data: {
                type: "object",
                required: true,
                default: {}
            }
        },
        lifecycle: {
            read: {
                role: ["everybody"],
            },
            update: {
                role: ["system"],
            },
            create: {
                role: ["system"],
            },
            delete: {
                role: ["system"],
            },

        }
    })
}
