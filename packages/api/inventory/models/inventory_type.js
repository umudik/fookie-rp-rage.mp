module.exports = {
    name: 'inventory_type',
    display: "name",
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
            role: ["admin"],
        },
        create: {
            role: ["admin"],
        },
        delete: {
            role: ["admin"],
        },

    }
}