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
            close_on_click: {
                type: "boolean",
                required: true,
                default: false,
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
                filter: ["filter_not_avaible_im"],
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

