module.exports = async function (ctx) {
    await ctx.model({
        name: 'object',
        database: "store",
        mixin: ["entity"],
        schema: {
            type: {
                relation: "object_type"
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
