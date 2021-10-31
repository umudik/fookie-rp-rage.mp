module.exports = async function (ctx) {
    await ctx.model({
        name: 'interaction_menu',
        display: "tag",
        database: "store",
        schema: {
            entity_type: {
                relation: "entity_type"
            },
            label: {
                type: "string",
                input: "text"
            },
            control: {
                type: "function",
                input: "text"
            },
            job: {
                type: "function",
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
    })
}
