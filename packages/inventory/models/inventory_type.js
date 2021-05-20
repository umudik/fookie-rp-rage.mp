module.exports = {
    name: 'inventory_type',
    display: "name",
    schema: {
        name: {
            required: true,
            type: "string",
            input: "text"
        },
        entity_type: {
            required: true,
            relation: "entity_type"
        },
        field: {
            required: true,
            type: "string",
            input: "text"
        },
        slotSize: {
            required: true,
            type: "number",
            input: "number"
        },
        maxWeight: {
            required: true,
            type: "number",
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