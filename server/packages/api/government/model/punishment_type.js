module.exports = async function (ctx) {
    await ctx.model({
        name: 'punishment_type',
        database: "mongodb",
        schema: {
            name: {
                type: "string",
                input: "text"
            },
            description: {
                type: "string",
                input: "rich"
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