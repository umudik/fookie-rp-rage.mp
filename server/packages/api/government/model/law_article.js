module.exports = async function (ctx) {
    await ctx.model({
        name: 'law_article',
        database: process.env.DATABASE,
        schema: {
            title: {
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