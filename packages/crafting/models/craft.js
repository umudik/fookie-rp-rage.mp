module.exports = {
    name: 'craft',
    display: "name",
    schema: {
        name: {
            type: "string",
            input: "text"
        },
        crafting_table: {
            relation: "crafting_table"
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