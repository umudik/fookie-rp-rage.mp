module.exports = async function (ctx) {
    await ctx.model({
        name: 'crafting_table_type',
        database: "store",
        schema: {
            joaat: {
                type: "string",
                input: "text"
            },
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
