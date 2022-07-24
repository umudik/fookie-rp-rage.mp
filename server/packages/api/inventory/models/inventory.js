module.exports = {
    name: 'inventory',
    database: "mongodb",
    mixin: ["cache"],
    schema: {
        inventory_type: {
            relation: "inventory_type",
            required: true,
        },
        openable: {
            type: "boolean",
            default: true
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