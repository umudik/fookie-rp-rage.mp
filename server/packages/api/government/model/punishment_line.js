module.exports = async function (ctx) {
    await ctx.model({
        name: 'punishment_line',
        database: process.env.DATABASE,
        schema: {
            punishment: {
                required: true,
                relation: "punishment",
            },
            punishment_type: {
                required: true,
                relation: "punishment_type",
            },
            player: {
                relation: "player",
                required: true
            },
            amount: {
                type: "number",
            },
            description: {
                type: "string",
                required: true,
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