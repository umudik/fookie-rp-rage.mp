module.exports = async function (ctx) {
    await ctx.model({
        name: 'whitelist',
        database: "store",
        schema: {
            rgscId: {
                type: "string",
                input: "text",
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
            schema: {
                role: ["everybody"],
            }
        }
    })
}