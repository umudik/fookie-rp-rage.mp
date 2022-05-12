module.exports = async function (ctx) {
    await ctx.model({
        mixin: ["entity", "cache"],
        name: 'marker',
        database: "mongodb",
        schema: {

        },
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
            schema: {
                role: ["everybody"],
            },
        }
    })
}



