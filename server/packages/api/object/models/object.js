module.exports = async function (ctx) {
    await ctx.model({
        name: 'object',
        database: "store",
        mixin: ["entity"],
        schema: {
            type: {
                type: "string",
                required: true
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
                role: ["admin", "rage_mp_post"],
            },
            delete: {
                role: ["system"],
            },

        }
    })
}
