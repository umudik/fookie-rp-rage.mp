module.exports = {
    name: 'faction',
    schema: {
        name: {
            type: "string",
            required: true,
            unique: true
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