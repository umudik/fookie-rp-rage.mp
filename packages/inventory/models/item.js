module.exports = {
    name: 'item',
    display: "id",
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
        data: {
            type: "JSONB",
            input: "json",
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