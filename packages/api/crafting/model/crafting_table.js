module.exports = async function (ctx) {
    await ctx.model({
        name: 'crafting_table',
        display: "name",
        database: "store",
        mixin: ["entity"],
        schema: {
            name: {
                type: "string",
                input: "text"
            },
            desc: {
                type: "string",
                input: "text"
            },
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
    }
    )
}
