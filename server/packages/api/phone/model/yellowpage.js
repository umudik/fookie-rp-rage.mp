module.exports = async function (ctx) {
    await ctx.model({
        name: 'yellowpages',
        schema: {
            account: {
                relation: "account",
            },
            title: {
                type: "string",
                input: "text"
            },
            content: {
                type: "string",
                input: "text"
            },
            image: {
                type: "string",
                input: "text"
            },
        },
        database: process.env.DATABASE,
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