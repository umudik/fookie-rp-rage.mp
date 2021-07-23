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
    database:"mongodb",lifecycle: {
        get: {
            role: ["everybody"],
        },
        getAll: {
            role: ["everybody"],
        },
        patch: {
            role: ["admin"],
        },
        post: {
            role: ["admin"],
        },
        delete: {
            role: ["admin"],
        },
        schema: {
            role: ["everybody"],
        }
    }
}