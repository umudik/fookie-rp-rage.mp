module.exports = {
    name: 'member',
    display: "id",
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
    fookie: {
        get: {
            role: ["everybody"],
        },
        getAll: {
            role: ["everybody"],
        },
        patch: {
            role: ["system_admin"],
        },
        post: {
            role: ["system_admin"],
        },
        delete: {
            role: ["system_admin"],
        },
        schema: {
            role: ["everybody"],
        }
    }
}