module.exports = {
    name: 'faction',
    display: "name",
    schema: {
        name: {
            type: "string",
            input: "text",
        },
        faction_type: {
            relation: "faction_type",
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