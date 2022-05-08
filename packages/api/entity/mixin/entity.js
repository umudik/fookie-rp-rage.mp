module.exports = async function (ctx) {
    await ctx.mixin({
        name: "entity",
        object: {
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
            lifecycle: {
                delete: {
                    effect: ["rage_mp_entity_sync"],
                    rule: ["need_target", "need_type"],
                    modify: ["set_target", "set_type"]
                },
                create: {
                    effect: ["rage_mp_entity_sync"],
                    rule: ["need_target", "need_type"],
                    modify: ["entity_add_method", "set_target", "set_type", "player_position"]
                },
                update: {
                    effect: ["rage_mp_entity_sync"],
                    rule: ["need_target", "need_type"],
                    modify: ["set_target", "set_type"]
                },
                spawn: {
                    modify: ["set_target", "set_type"],
                    rule: ["need_target", "need_type"],
                    role: ["system"],
                    filter: [],
                    effect: ["rage_mp_entity_sync"]
                },
                despawn: {
                    modify: ["set_target", "set_type"],
                    rule: ["need_target", "need_type"],
                    role: ["system"],
                    filter: [],
                    effect: ["rage_mp_entity_sync"]
                },
                save: {
                    modify: ["set_target", "set_type"],
                    rule: ["need_target", "need_type"],
                    role: ["system"],
                    effect: [],
                    filter: [],
                }
            }
        }
    })
}
