module.exports = async function (ctx) {
    await ctx.model({
        name: "apartment_exit_door",
        mixin: ["entity", "cache"],
        database: "mongodb",
        schema: {
            apartment: {
                type: "string",
                required: true,
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
