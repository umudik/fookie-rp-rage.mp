

module.exports = async function (ctx) {
    await ctx.model({
        name: 'craft_type',
        database: process.env.DATABASE,
        schema: {
            name: {
                type: "string",
                required: true,
                unique: true
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
                role: ["system"],
            },
            delete: {
                role: ["system"],
            },

        }
    })
}
