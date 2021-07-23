module.exports = {
    name: 'faction_type',
    display: "name",
    schema: {
        name: {
            type: "string",
            input: "text",
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