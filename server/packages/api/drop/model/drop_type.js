module.exports = async function (ctx) {
    await ctx.model({
        name: 'drop_type',
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