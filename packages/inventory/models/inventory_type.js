module.exports = {
    name: 'inventory_type',
    display: "name",
    schema: {
        name: {
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