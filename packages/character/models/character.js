module.exports = {
    name: 'character',
    display: "name",
    schema: {
        name: {
            type: "string",
            input: "text"
        },
        system_user: {
            relation: "system_user"
        },
        inventory: {
            relation: "inventory"
        },
        hunger: {
            type: "integer",
            input: "number"
        },
        thirst: {
            type: "integer",
            input: "number"
        },
        dimension: {
            input: "number"
        },
        position: {
            required: true,
            type: "jsonb",
            input: "json",
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
        spawn: {
            rule: [],
            role: [],
            effect: [],
            modify: [],
            filter: [],
        },
    }
}