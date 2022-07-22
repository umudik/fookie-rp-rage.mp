module.exports = async function (ctx) {
    await ctx.mixin({
        name: "entity",
        object: {
            schema: {
                tag: {
                    type: "string",
                    required: true,
                    default: "-"
                },
                parent_id: {
                    type: "string",
                    required: true,
                    default: "-",
                },
                spawned: {
                    type: "boolean",
                    required: true,
                    default: true
                },
                dimension: {
                    type: "number",
                    default: 0,
                },
                position: {
                    required: true,
                    type: "object",
                },
                heading: {
                    type: "number",
                    default: 0
                },
            },
            lifecycle: {
                read: {
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
                delete: {
                    effect: ["rage_mp_entity_sync"],
                    rule: ["need_type"],
                    modify: ["set_type", "add_entities_to_state"]
                },
            }
        }
    })
}
