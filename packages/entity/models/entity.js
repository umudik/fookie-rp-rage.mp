module.exports = {
    name: 'entity',
    display: "name",
    schema: {
        type: {
            required:true,
            relation: "entity_type"
        },
        entityId: {
            required:true,
            input: "number"
        },
        alpha: {
            input: "number"
        },
        data: {
            type: "jsonb",
            input: "json",
        },
        dimension: {
            input: "number"
        },
        model: {
            input: "number"
        },
        position: {
            required:true,
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
            effect: ["rage_mp_entity_sync"],
        },
        post: {
            role: ["system_admin"],
            effect: ["rage_mp_entity_sync"],
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