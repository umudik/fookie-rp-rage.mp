module.exports = {
    name: 'entity',
    display: "name",
    schema: {
        type: {
            relation: "entity_type"
        },
        entityId: {
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
            modify: ["get_target"],
            filter: [],
            role: ["system_admin"],
        },
        save: {
            rule: [],
            effect: [],
            modify: ["get_target"],
            filter: [],
            role: ["system_admin"],
        },
        find: {
            rule: [],
            effect: [],
            modify: ["get_target"],
            filter: [],
            role: ["system_admin"],
        },
        despawn: {
            rule: [],
            effect: [],
            modify: ["get_target"],
            filter: [],
            role: ["system_admin"],
        }
    }
}