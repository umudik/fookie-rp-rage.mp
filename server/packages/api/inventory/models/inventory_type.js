module.exports = {
    name: 'inventory_type',
    database: "store",
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
    lifecycle: {
        read: {
            role: ["everybody"],
        },
        update: {
            role: ["system"],
        },
        create: {
            role: ["system"],
        },
        delete: {
            role: ["system"],
        },

    }
}