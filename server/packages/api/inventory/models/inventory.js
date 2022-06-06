module.exports = {
    name: 'inventory',
    database: "mongodb",
    schema: {
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