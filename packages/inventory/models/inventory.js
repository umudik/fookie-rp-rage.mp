module.exports = {
    name: 'inventory',
    display: "_id",
    schema: {
        inventory_type: {
            required:true,
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