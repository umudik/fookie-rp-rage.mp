module.exports = {
    name: 'punishment_type',
    display: "name",
    schema: {
        name: {
            type: "string",
            input: "text"
        },
        description: {
            type: "string",
            input: "rich"
        }
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