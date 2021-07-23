module.exports = {
    name: 'bank',
    display: "name",
    schema: {
        owner: {
            relation: "character"
        },
        name: {
            type: "string",
            input: "text",
        },
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
        },
    }
}