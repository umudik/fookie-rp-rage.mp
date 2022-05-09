module.exports = {
    name: 'inventory',
    database: "mongodb",
    schema: {
        inventory_type: {
            required: true,
            relation: "inventory_type",
        },
        openable: {
            type: "boolean",
            input: "boolean"
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