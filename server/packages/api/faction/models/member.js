module.exports = {
    name: 'member',
    schema: {
        faction: {
            relation: "faction",
        },
        member_type: {
            relation: "member_type",
        },
        character: {
            relation: "character",
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