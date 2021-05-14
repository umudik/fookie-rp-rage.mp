module.exports = {
    name: 'entity_type',
    display: "name",
    schema: {
        name: {
            type: "string",
            input: "text"
        },
        pool: {
            type: "string",
            input: "text"
        },
        model: {
            type: "string",
            input: "text"
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
            type: "integer",
            input: "number"
        }
    },
    fookie: {
        get: {
            auth: ["everybody"],
        },
        getAll: {
            auth: ["everybody"],
        },
        patch: {
            auth: ["system_admin"],
        },
        post: {
            auth: ["system_admin"],
        },
        delete: {
            auth: ["system_admin"],
        },
        schema: {
            auth: ["everybody"],
        }
    }
}