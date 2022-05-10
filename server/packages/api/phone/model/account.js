module.exports = async function (ctx) {
    await ctx.model({
        name: 'account',
        database: "mongodb",
        schema: {
            email: {
                type: "string",

            },
            password: {
                type: "string",

            },
            image: {
                type: "string",

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