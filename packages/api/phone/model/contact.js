module.exports = async function (ctx) {
    await ctx.model({
        name: 'contact',
        display: "_id",
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