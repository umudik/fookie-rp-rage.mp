module.exports = async function (ctx) {
    await ctx.mixin({
        name: "entity",
        object: {
            schema: {
                type: {
                    type: "string",
                    required: true
                },
                spawned: {
                    type: "boolean",
                    required: true,
                    default: true
                },
                dimension: {
                    type: "number",
                },
                position: {
                    required: true,
                    type: "object",
                },
                heading: {
                    type: "number",
                },
            },
            lifecycle: {
                delete: {
                    effect: ["rage_mp_entity_sync"],
                    rule: ["need_type"],
                    modify: ["set_type", "add_entities_to_state"]
                },
                create: {
                    effect: ["rage_mp_entity_sync"],
                    rule: ["need_type"],
                    modify: ["set_type"]
                },
                update: {
                    effect: ["rage_mp_entity_sync"],
                    rule: ["need_type"],
                    preRule: ["dont_spawn_twice"],
                    modify: ["set_type"]
                },
                spawn: {
                    modify: ["set_type"],
                    rule: ["need_type"],
                    role: ["system"],
                    filter: [],
                    effect: ["rage_mp_entity_sync"]
                },
                despawn: {
                    modify: ["set_type"],
                    rule: ["need_type"],
                    role: ["system"],
                    filter: [],
                    effect: ["rage_mp_entity_sync"]
                },
                save: {
                    modify: ["set_type"],
                    rule: ["need_type"],
                    role: ["system"],
                    effect: [],
                    filter: [],
                }
            }
        }
    })
}
