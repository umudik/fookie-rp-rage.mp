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
        system_user: {
            relation: "system_user"
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