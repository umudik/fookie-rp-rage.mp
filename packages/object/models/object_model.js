module.exports = {
    name: 'object_model',
    display: "key",
    schema: {
        key: {
            type: "string",
            input: "text"
        }
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
            auth: ["system_admin"],
        },
        delete: {
            auth: ["system_admin"],
        },
        schema: {
            auth: ["everybody"],
        }
    }
}