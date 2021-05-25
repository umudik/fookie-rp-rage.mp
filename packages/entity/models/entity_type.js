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
            input: "json"
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
        },
    }
}