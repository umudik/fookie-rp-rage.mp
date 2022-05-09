module.exports = {
    name: 'faction',
    schema: {
        name: {
            type: "string",
            input: "text",
        },
        faction_type: {
            relation: "faction_type",
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