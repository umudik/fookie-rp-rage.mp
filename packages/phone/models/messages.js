module.exports = {
    name: 'message',
    display: "_id",
    schema: {
        sender: {
            relation: "character",
        },
        target: {
            relation: "character",
        },
        message: {
            type: "string",
            input: "texg"
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