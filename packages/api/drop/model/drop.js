module.exports = async function (ctx) {
    await ctx.model({
        mixin: ["entity"],
        name: 'drop',
        schema: {
            type: {
                relation: "drop_type",
                required: true,
            },
            inventory: {
                required: true,
                relation: "inventory",
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