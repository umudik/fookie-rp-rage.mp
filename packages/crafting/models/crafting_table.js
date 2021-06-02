module.exports = {
    mixin:["entity"],
    name: 'crafting_table',
    display: "name",
    schema: {
        name: {
            type: "string",
            input: "text"
        },
        desc: {
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