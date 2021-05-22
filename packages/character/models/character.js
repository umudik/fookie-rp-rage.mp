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
            type: "number",
            input: "number"
        },
        thirst: {
            type: "number",
            input: "number"
        },
        dimension: {
            type:"number",
            input: "number"
        },
        position: {
            type: "object",
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