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