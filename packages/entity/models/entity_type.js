module.exports = {
    name: 'entity_type',
    display: "name",
    schema: {
        name: {
            type: "string",
            input: "text"
        },
        model: {
            required:true,
            type: "string",
            input: "text"
        },
        pool: {
            required:true,
            type: "string",
            input: "text"
        },
        data: {
            type: "object",
            input: "object"
        },
        spawnAtStart: {
            type: "boolean",
            input: "boolean"
        },
        syncInterval: {
            type: "boolean",
            input: "boolean"
        },
        syncRate: {
            type: "number",
            input: "number"
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