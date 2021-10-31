

module.exports = async function (ctx) {
    await ctx.model({
        name: 'craft',
        display: "name",
        database: "store",
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
