module.exports = async function (ctx) {
    await ctx.model({
        name: 'punishment',
        display: "_id",
        database: "store",
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