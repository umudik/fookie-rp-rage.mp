module.exports = async function (ctx) {
    await ctx.model({
        name: 'craft_in',
        database: process.env.DATABASE,
        schema: {
            craft_type: {
                relation: "craft_type",
                required: true,
            },
            item_type: {
                relation: "item_type",
                required: true,
            },
            amount: {
                type: "number",
                required: true,
                default: 1
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
