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
        openable: {
            type: "boolean",
            inptut: "boolean"
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