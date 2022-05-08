module.exports = async function (ctx) {
    await ctx.model({
        name: 'contact',
        schema: {
            owner: {
                relation: "character",
            },
            other: {
                relation: "character",
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