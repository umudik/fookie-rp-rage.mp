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