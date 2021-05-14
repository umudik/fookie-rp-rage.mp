module.exports = {
    name: 'example',
    display: "id",
    schema: {
        position: {
            type: "jsonb",
            input: "json"
        },
        type: {
            type: "integer",
            relation: "example",
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