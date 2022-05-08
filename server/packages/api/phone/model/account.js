module.exports = async function (ctx) {
    await ctx.model({
        name: 'account',
        schema: {
            email: {
                type: "string",
                type: "text"
            },
            password: {
                type: "string",
                type: "password"
            },
            image: {
                type: "string",
                type: "text"
            }
        },
        database: "store",
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