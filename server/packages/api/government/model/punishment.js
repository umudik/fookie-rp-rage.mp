module.exports = async function (ctx) {
    await ctx.model({
        name: 'punishment',
        database: process.env.DATABASE,
        schema: {
            player: {
                relation: "player",
                required: true
            },
            created_at: {
                type: "number",
                required: true,
            }
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