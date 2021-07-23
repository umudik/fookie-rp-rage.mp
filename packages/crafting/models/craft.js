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