module.exports = {
    name: 'inventory_type',
    database: "mongodb",
    mixin: ["cache"],
    schema: {
        name: {
            required: true,
            type: "string",
            input: "text"
        },
        tag: {
            required: true,
            type: "string",
            input: "text"
        },
        entity_type: {
            required: true,
            type: "string",
            default: "player"
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