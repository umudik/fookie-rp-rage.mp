module.exports = {
    name: 'whitelist',
    display: "rgscId",
    schema: {
        rgscId: {
            type: "string",
            input: "text",
        },
        socialClub: {
            type: "string",
            input: "text",
        },
        user: {
            relation: "user"
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