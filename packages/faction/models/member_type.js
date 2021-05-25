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