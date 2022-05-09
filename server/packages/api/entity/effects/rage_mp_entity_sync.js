module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "rage_mp_entity_sync",
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
                            let type_res = await ctx.run({
                                token: true,
                                model: `${payload.model}_type`,
                                method: "read",
                                query: { filter: { pk: entity.type } }
                            })
                            const type = type_res.data[0]
                            console.log(type);
                            rage_entity = mp[state.entity_type.pool].new(mp.joaat(type.joaat), entity.position)
                            rage_entity.setVariable("fookie_id", entity._id.toString())
                            rage_entity.setVariable("fookie_type", `${payload.model}_type`)
                            rage_entity.setVariable("entity_type", state.entity_type.model)
                            update_body = entity
                        }
                        else {
                            rage_entity = mp[state.entity_type.pool].toArray().find(e => e.getVariable("fookie_id") == entity._id.toString())
                            if (rage_entity && mp[state.entity_type.pool].exists(rage_entity.id)) {
                                rage_entity.destroy();
                            }
                            return
                        }


                    } else {
                        rage_entity = mp[state.entity_type.pool].toArray().find(e => e.getVariable("fookie_id") == entity._id.toString())
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
                    let type_res = await ctx.run({
                        token: true,
                        model: `${payload.model}_type`,
                        method: "read",
                        query: { filter: { pk: payload.body.type } }
                    })
                    const type = type_res.data[0]
                    let entity = mp[state.entity_type.pool].new(mp.joaat(type.joaat), payload.body.position)
                    entity.setVariable("fookie_id", payload.response.data._id.toString())
                    entity.setVariable("fookie_type", `${payload.model}_type`)
                    entity.setVariable("entity_type", state.entity_type.model)

                    for (let f in payload.response.data) {
                        entity[f] = payload.response.data[f]
                    }
                }
            }


            if (payload.method == "delete") {
                for (let entity of state.deleteEntities) {
                    let rage_entity = mp[state.entity_type.pool].toArray().find(e => e.getVariable("fookie_id") == entity._id.toString())
                    if (rage_entity && mp[state.entity_type.pool].exists(rage_entity.id)) {
                        rage_entity.destroy();
                    }
                }

            }

        }
    })
}
