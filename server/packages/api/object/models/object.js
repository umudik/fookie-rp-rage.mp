module.exports = async function (ctx) {
    await ctx.model({
        name: 'object',
        database: "mongodb",
        mixin: ["entity"],
        schema: {
            name: {
                type: "string",
                default: "Misnomer object"
            }
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
