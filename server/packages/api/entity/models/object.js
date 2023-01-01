module.exports = async function (ctx) {
    await ctx.model({
        name: 'object',
        database: process.env.DATABASE,
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
