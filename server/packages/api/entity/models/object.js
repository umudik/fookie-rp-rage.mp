module.exports = async function (ctx) {
    await ctx.model({
        name: 'object',
        database: "mongodb",
        mixin: ["entity", "cache"],
        schema: {
            joaat: {
                type: "string",
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
}
