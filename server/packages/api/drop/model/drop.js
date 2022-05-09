module.exports = async function (ctx) {
    await ctx.model({
        mixin: ["entity"],
        name: 'drop',
        schema: {
            inventory: {
                required: true,
                relation: "inventory",
            },
        },
        database: "mongodb",
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