module.exports = {
    name: 'interaction_menu',
    display: "tag",
    database: "store",
    schema: {
        entity_type: {
            relation: "entity_type"
        },
        control: {
            type: "function",
            input: "text"
        },
        job: {
            type: "function",
        },
        label: {
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