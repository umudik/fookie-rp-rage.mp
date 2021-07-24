module.exports = {
    name: 'interaction_menu',
    display: "tag",
    schema: {
        entity_type: {
            relation: "entity_type"
        },
        type: {
            type: "string",
            input: "text"
        },
        control: {
            type: "string",
            input: "text"
        },
        job: {
            type: "string",
            input: "text"
        },
        label: {
            type: "string",
            input: "text"
        },
    },
    database: "mongodb",
    lifecycle: {
        get: {
            role: ["everybody"],
        },
        getAll: {
            role: ["everybody"],
        },
        patch: {
            role: ["admin"],
        },
        post: {
            role: ["admin"],
        },
        delete: {
            role: ["admin"],
        },
        schema: {
            role: ["everybody"],
        }
    }
}