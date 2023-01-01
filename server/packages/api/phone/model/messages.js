module.exports = async function (ctx) {
    await ctx.model({
        name: 'message',
        schema: {
            sender: {
                relation: "character",
            },
            target: {
                relation: "character",
            },
            message: {
                type: "string",
                input: "texg"
            }
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