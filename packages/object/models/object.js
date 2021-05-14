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
            auth: ["everybody"],
        },
        getAll: {
            auth: ["everybody"],
        },
        patch: {
            auth: ["system_admin"],
        },
        post: {
            auth: ["system_admin", "rage_mp_post"],
        },
        delete: {
            auth: ["system_admin"],
        },
        schema: {
            auth: ["everybody"],
        }
    }
}