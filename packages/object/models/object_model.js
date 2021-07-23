module.exports = {
    name: 'object_model',
    display: "key",
    schema: {
        key: {
            type: "string",
            input: "text"
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