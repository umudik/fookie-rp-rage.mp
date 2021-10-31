module.exports = {
    name: 'member_type',
    display: "name",
    schema: {
        name: {
            type: "string",
            input: "text",
        },
        level: {
            type: "number",
            input: "number"
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