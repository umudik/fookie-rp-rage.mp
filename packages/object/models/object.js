module.exports = {
    name: 'object',
    display: "name",
    schema: {
        name: {
            type: "string",
            input: "text"
        },
        type: {
            relation: "object_type"
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
            role: ["admin", "rage_mp_post"],
        },
        delete: {
            role: ["admin"],
        },
        schema: {
            role: ["everybody"],
        },
    }
}