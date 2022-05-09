module.exports = async function (ctx) {
    await ctx.model({
        name: 'craft_in',
        database: "mongodb",
        schema: {
            craft: {
                relation: "craft"
            },
            item_type: {
                relation: "item_type"
            },
            amount: {
                type: "number",
                input: "number"
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
