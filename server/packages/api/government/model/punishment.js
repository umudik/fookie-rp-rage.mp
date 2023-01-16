module.exports = async function (ctx) {
    await ctx.model({
        name: 'punishment',
        database: process.env.DATABASE,
        schema: {
            punishment_type: {
                required: true,
                relation: "punishment_type",
            },
            amount: {
                type: "number",
            },
            description: {
                type: "string",
                required: true,
            },
            player: {
                relation: "player",
                required: true
            },
            time: {
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