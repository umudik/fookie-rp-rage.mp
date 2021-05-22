module.exports = {
    name: 'example',
    display: "id",
    schema: {
        rgscId: {
            type: "string",
            relation: "text",
        },
        socialClub: {
            type: "string",
            relation: "text",
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