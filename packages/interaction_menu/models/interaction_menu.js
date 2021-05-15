module.exports = {
    name: 'interaction_menu',
    display: "tag",
    schema: {
        entity_type: {
            relation: "entity_type"
        },
        control: {
            type: "string",
            input: "text"
        },
        label: {
            type: "string",
            input: "text"
        },
    },
    fookie: {
        get: {
            role: ["everybody"],
        },
        getAll: {
            role: ["everybody"],
        },
        patch: {
            role: ["system_admin"],
        },
        post: {
            role: ["system_admin"],
        },
        delete: {
            role: ["system_admin"],
        },
        schema: {
            role: ["everybody"],
        }
    }
}