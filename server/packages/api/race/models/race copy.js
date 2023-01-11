module.exports = async function (ctx) {
    await ctx.model({
        name: 'race_type',
        database: process.env.DATABASE,
        mixins: [],
        schema: {
            name: {
                type: "string",
                required: true
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