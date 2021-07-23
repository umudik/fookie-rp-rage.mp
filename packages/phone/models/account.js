module.exports = {
    name: 'account',
    display: "_id",
    schema: {
        email: {
            type: "string",
            type: "text"
        },
        password: {
            type: "string",
            type: "password"
        },
        image: {
            type: "string",
            type: "text"
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