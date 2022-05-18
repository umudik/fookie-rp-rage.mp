module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "rage_mp_entity_sync",
        async: false,
        function: async function (payload, ctx, state) {
            if (payload.method == "update") {
                const entities_res = await ctx.run({
                    token: true,
                    model: payload.model,
                    method: "read",
                    query: payload.query
                })
                let update_body = null
                let rage_entity = null
                for (const entity of entities_res.data) {
                    if (ctx.lodash.has(payload.body, "spawned")) {
                        if (payload.body.spawned) {
                            rage_entity = state.entity_type.creator(entity, state.entity_type)
                            rage_entity.setVariable("fookie_id", entity._id)
                            rage_entity.setVariable("tag", entity.tag)
                            update_body = entity
                        }
                        else {
                            rage_entity = mp[state.entity_type.pool].toArray().find(e => e.getVariable("fookie_id") == entity._id)
                            if (rage_entity && mp[state.entity_type.pool].exists(rage_entity.id)) {
                                state.entity_type.destroyer(rage_entity, state.entity_type)
                            }
                            return
                        }


                    } else {
                        rage_entity = mp[state.entity_type.pool].toArray().find(e => e.getVariable("fookie_id") == entity._id)
                        if (rage_entity && mp[state.entity_type.pool].exists(rage_entity.id)) {
                            update_body = payload.body
                        }
                    }

                    for (let f in update_body) {
                        rage_entity[f] = update_body[f]
                    }
                }
            }
            if (payload.method == "create") {
                if (ctx.lodash.has(payload.body, "spawned") && payload.body.spawned) {
                    let entity = state.entity_type.creator(payload.body, state.entity_type)
                    entity.setVariable("fookie_id", payload.response.data._id)
                    entity.setVariable("tag", payload.body.tag)

                    for (let f in payload.response.data) {
                        entity[f] = payload.response.data[f]
                    }
                }
            }
            if (payload.method == "delete") {
                for (let entity of state.deleteEntities) {
                    let rage_entity = mp[state.entity_type.pool].toArray().find(e => e.getVariable("fookie_id") == entity._id)
                    if (rage_entity && mp[state.entity_type.pool].exists(rage_entity.id)) {
                        state.entity_type.destroyer(rage_entity, state.entity_type)
                    }
                }

            }

        }
    })
}
