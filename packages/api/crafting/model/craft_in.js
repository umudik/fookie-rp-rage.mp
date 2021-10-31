module.exports = async function (ctx) {
    await ctx.model({
        name: 'craft_in',
        display: "_id",
        database: "store",
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
                role: ["admin"],
            },
            create: {
                role: ["admin"],
            },
            delete: {
                role: ["admin"],
            },

        }
    })
}
