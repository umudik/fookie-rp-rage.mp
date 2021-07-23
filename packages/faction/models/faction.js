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