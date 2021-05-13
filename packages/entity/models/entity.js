module.exports = {
    name: 'entity',
    display: "id",
    schema: {
        type: {         
            relation: "entity_type"
        },
        alpha: {
            type: "integer",
            input: "number"
        },
        data: {
            type: "jsonb",
            input: "json"
        },
        dimension: {
            type: "integer",
            input: "number"
        },
        model: {
            type: "string",
            input: "text"
        },
        position: {
            type: "jsonb",
            input: "json"
        },

    },
    fookie: {
        get: {
            auth: ["everybody"],
        },
        getAll: {
            auth: ["everybody"],
        },
        patch: {
            auth: ["system_admin"],
        },
        post: {
            auth: ["system_admin"],
        },
        delete: {
            auth: ["system_admin"],
        },
        schema: {
            auth: ["everybody"],
        }
    }
}