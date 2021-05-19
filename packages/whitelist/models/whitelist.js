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