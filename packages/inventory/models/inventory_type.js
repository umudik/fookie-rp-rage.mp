module.exports = {
    name: 'inventory_type',
    display: "name",
    schema: {
        key: {
            type: "string",
            input: "text"
        },
        slot_size: {
            type: "integer",
            input: "number"
        },
        maxWeight: {
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