module.exports = {
    name: 'inventory',
    display: "id",
    schema: {
        inventory_type: {
            type: "integer",
            relation: {
                model: "inventory_type",
                key: "key"
            },
        },
        name: {
            type: "string",
            input: "text"
        },
        position: {
            type: "jsonb",
            input: "json"
        },
        hunger: {
            type: "integer",
            input: "number"
        },
        thirst: {
            type: "integer",
            input: "number"
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