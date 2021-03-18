module.exports = {
    name: 'system_model',
    schema: {
        item_type: {
            type: "INTEGER",
            relation: {
                model: "item_type",
                key: "key"
            },
        },
        inventory: {
            type: "INTEGER",
            relation: {
                model: "inventory",
                key: "id"
            },
        },
        amount: {
            type: "STRING",
            input: "text",
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
        options: {
            auth: ["everybody"],
        }
    }
}