module.exports = {
    name: 'example',
    display: "_id",
    schema: {
        account: {
            relation: "account",
        },
        title: {
            type: "string",
            input: "text"
        },
        content: {
            type: "string",
            input: "text"
        },
        image: {
            type: "string",
            input: "text"
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