module.exports = {
    name: 'member_type',
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