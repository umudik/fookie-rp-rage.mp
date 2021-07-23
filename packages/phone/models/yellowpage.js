module.exports = {
    name: 'yellowpages',
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