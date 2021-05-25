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