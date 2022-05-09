module.exports = async function (ctx) {
    await ctx.model({
        name: 'interaction_menu',
        database: "store",
        schema: {
            name: {
                type: "string",
                required: true,
            },
            entity_type: {
                type: "string",
                required: true,
            },
            label: {
                type: "string",
                required: true,
            },
            tag: {
                type: "string",
            },
            control: {
                type: "function",
            },
            job: {
                type: "function",
                required: true,
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

