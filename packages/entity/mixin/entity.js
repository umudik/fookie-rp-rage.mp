module.exports = {
    schema: {
        dimension: {
            type: "number",
            input: "number"
        },
        position: {
            required: true,
            type: "object",
            input: "object",
        },
        heading: {
            type: "object",
            input: "object",
        },
    },
    database:"mongodb",lifecycle: {
        delete: {
            effect: ["rage_mp_entity_sync"],
            rule: ["need_target", "need_type"],
            modify: ["set_target", "set_type"]
        },
        post: {
            effect: ["rage_mp_entity_sync"],
            rule: ["need_target", "need_type"],
            modify: ["set_target", "set_type", "player_position"]
        },
        patch: {
            effect: ["rage_mp_entity_sync"],
            rule: ["need_target", "need_type"],
            modify: ["set_target", "set_type"]
        },
        spawn: {
            modify: ["set_target", "set_type"],
            rule: ["need_target", "need_type"],
            role: ["admin"],         
            filter: [],
            effect: ["rage_mp_entity_sync"]
        },
        despawn: {
            modify: ["set_target", "set_type"],
            rule: ["need_target", "need_type"],
            role: ["admin"],          
            filter: [],
            effect: ["rage_mp_entity_sync"]
        },
        save: {
            modify: ["set_target", "set_type"],
            rule: ["need_target", "need_type"],
            role: ["admin"],
            effect: [],
            filter: [],
        }
    }
}