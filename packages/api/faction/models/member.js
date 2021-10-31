module.exports = {
    name: 'member',
    display: "_id",
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