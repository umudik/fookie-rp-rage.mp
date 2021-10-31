module.exports = {
    name: 'inventory',
    database: "store",
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