module.exports = async function (ctx) {
    await ctx.model({
        name: 'whitelist',
        display: "rgscId",
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
                role: ["admin"],
            },
            create: {
                role: ["admin"],
            },
            delete: {
                role: ["admin"],
            },
            schema: {
                role: ["everybody"],
            }
        }
    })
}