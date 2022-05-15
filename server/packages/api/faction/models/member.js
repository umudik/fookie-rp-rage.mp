module.exports = {
    name: 'member',
    database: "mongodb",
    schema: {
        faction: {
            relation: "faction",
        },
        character: {
            relation: "character",
        },
        role: {
            type: "string",
            required: true,
        }
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