module.exports = {
    name: 'faction_type',
    schema: {
        name: {
            type: "string",
            input: "text",
        },
    },
    database: "mongodb",
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