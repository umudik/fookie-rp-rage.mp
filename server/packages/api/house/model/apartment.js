module.exports = async function (ctx) {
    await ctx.model({
        name: "apartment",
        mixin: ["entity", "cache"],
        database: "mongodb",
        schema: {
            name: {
                type: "string",
                required: true,
                unique: true,
            },
            fixed_dimension: {
                type: "number",
                required: true,
            },
            owner: {
                relation: "user",
            }
        },
        lifecycle: {
            create: {
                role: ["system"],
            },
            read: {
                role: ["everybody"],
            },
            update: {
                role: ["system"],
            },
            delete: {
                role: ["system"],
            },
        }
    })
}
