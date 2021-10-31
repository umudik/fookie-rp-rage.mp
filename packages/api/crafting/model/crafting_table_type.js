module.exports = async function (ctx) {
    await ctx.model({
        name: 'crafting_table_type',
        display: "joaat",
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
