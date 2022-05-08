module.exports = async function (ctx) {
    await ctx.model({
        name: 'interaction_menu',
        database: "store",
        schema: {
            entity_type: {
                relation: "entity_type"
            },
            label: {
                type: "string",
                input: "text"
            },
            tag: {

            },
            control: {
                type: "function",
                input: "text"
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

