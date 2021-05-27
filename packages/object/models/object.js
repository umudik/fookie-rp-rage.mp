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
            role: ["system_admin", "rage_mp_post"],
        },
        delete: {
            role: ["system_admin"],
        },
        schema: {
            role: ["everybody"],
        },
    }
}