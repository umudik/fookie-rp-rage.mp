module.exports = {
    name: 'entity',
    display: "name",
    schema: {
        dimension: {
            type: "number",
            input: "number"
        },
        position: {
            required: true,
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
            effect: [],
        },
        post: {
            modify: [],
            role: ["system_admin"],
            effect: [],
        },
        delete: {
            role: ["system_admin"],
        },
        schema: {
            role: ["everybody"],
        },
        spawn: {
            rule: [],
            effect: [],
            modify: ["set_target"],
            filter: [],
            role: ["system_admin"],
        },
        save: {
            rule: [],
            effect: [],
            modify: ["set_target"],
            filter: [],
            role: ["system_admin"],
        },
        find: {
            rule: [],
            effect: [],
            modify: ["set_target"],
            filter: [],
            role: ["system_admin"],
        },
        despawn: {
            rule: [],
            effect: [],
            modify: ["set_target"],
            filter: [],
            role: ["system_admin"],
        }
    }
}