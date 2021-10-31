module.exports = async function (ctx) {
    await ctx.model({
        name: 'drop_type',
        display: "joaat",
        schema: {
            joaat: {
                required: true,
                type: "string",
                input: "text",
            },
        },
        database: "store",
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