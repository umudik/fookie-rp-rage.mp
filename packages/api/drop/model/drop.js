module.exports = async function (ctx) {
    await ctx.model({
        mixin: ["entity"],
        name: 'drop',
        display: "_id",
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