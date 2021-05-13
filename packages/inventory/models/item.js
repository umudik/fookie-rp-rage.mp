module.exports = {
    name: 'item',
    display: "id",
    schema: {
        item_type: {
            type: "integer",
            relation: "item_type",
        },
        inventory: {
            type: "integer",
            relation: "inventory",
        },
        amount: {
            type: "string",
            input: "text",
        },
        data: {
            type: "jsonb",
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
        schema: {
            auth: ["everybody"],
        }
    }
}