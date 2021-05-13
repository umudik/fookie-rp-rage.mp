module.exports = {
    name: 'character',
    display: "id",
    schema: {
        name: {
            type: "string",
            input: "text"
        },
        system_user: {
            relation:"system_user"
        },
        hunger: {
            type: "integer",
            input: "number"
        },
        thirst: {
            type: "integer",
            input: "number"
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