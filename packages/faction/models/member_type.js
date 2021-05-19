module.exports = {
    name: 'member_type',
    display: "name",
    schema: {
        name: {
            relation: "faction",
        },
        level: {
            relation: "character",
        },
        faction_type: {
            relation: "faction_type",
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