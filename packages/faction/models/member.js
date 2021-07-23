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
    database:"mongodb",lifecycle: {
        get: {
            role: ["everybody"],
        },
        getAll: {
            role: ["everybody"],
        },
        patch: {
            role: ["admin"],
        },
        post: {
            role: ["admin"],
        },
        delete: {
            role: ["admin"],
        },
        schema: {
            role: ["everybody"],
        }
    }
}