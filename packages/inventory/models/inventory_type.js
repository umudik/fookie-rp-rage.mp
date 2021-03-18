module.exports = {
    name: 'inventory_type',
    schema: {
        key: {
            type: "STRING",
            input: "text"
        },
        name: {
            type: "STRING",
            input: "text"
        },
        slot_size: {
            type: "INTEGER",
            input: "number"
        },
        maxWeight: {
            type: "FLOAT",
            input: "number"
        },
        model: {
            type: "INTEGER",
            relation: {
                model: "system_model",
                key: "id"
            }
        }
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
        options: {
            auth: ["everybody"],
        }
    }
}