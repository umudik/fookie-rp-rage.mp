module.exports = {
    name: 'inventory',
    display: "id",
    schema: {
        inventory_type: {
            type: "integer",
            relation: "inventory_type",
        },
        openable: {
            type: "boolean",
            input: "boolean"
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