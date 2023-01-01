module.exports = async function (ctx) {
    await ctx.model({
        name: 'shop',
        database: process.env.DATABASE,
        mixin: ["entity"],
        schema: {
            inventory: {
                required: true,
                relation: "inventory"
            },
            owner: {
                relation: "character"
            },
            open: {
                type: "boolean",
                input: "boolean"
            },
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