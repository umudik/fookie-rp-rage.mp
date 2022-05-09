

module.exports = async function (ctx) {
    await ctx.model({
        name: 'craft',
        database: "mongodb",
        schema: {
            name: {
                type: "string",
                input: "text"
            },
            controller: {
                type: "function",
                required: true
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
