module.exports = {
    name: 'faction_type',
    display: "name",
    schema: {
        name: {
            type: "string",
            input: "text",
        },
    },
    database: "store",
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