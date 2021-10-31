module.exports = async function (ctx) {
    await ctx.model({
        name: 'message',
        display: "_id",
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
        database: "store",
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