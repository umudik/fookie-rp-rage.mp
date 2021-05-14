module.exports = {
    name: 'bank',
    display: "name",
    schema: {
        owner: {
            relation: "character"
        },
        name: {
            type: "string",
            input: "text",
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