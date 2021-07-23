module.exports = {
    name: 'punishment_type',
    display: "name",
    schema: {
        name: {
            type: "string",
            input: "text"
        },
        description: {
            type: "string",
            input: "rich"
        }
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