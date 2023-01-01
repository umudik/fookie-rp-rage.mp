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
                input: "number"
            },
            description: {
                required: true,
                type: "string",
                input: "rich",
            },
            character: {
                relation: "character"
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