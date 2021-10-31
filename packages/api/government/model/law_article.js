module.exports = async function (ctx) {
    await ctx.model({
        name: 'law_article',
        display: "title",
        database: "store",
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