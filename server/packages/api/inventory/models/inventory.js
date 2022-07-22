module.exports = {
    name: 'inventory',
    database: "mongodb",
    schema: {
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