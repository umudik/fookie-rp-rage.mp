module.exports = {
    name: 'object_type',
    display: "key",
    schema: {
        key: {
            type: "string",
            input: "text"
        },
        model: {
            type: "string",
            input: "text"
        }
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