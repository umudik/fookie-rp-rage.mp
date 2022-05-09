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

                for (const entity of entities_res.data) {
                    let rage_entity = mp[state.entity_type.pool].toArray().find(e => e.getVariable("fookieId") == entity._id.toString())
                    if (rage_entity && mp[state.entity_type.pool].exists(rage_entity.id)) {
                        for (let f in payload.body) {
                            rage_entity[f] = payload.body[f]
                        }
                    }
                }
            }

            else if (payload.method == "create") {
                let type_res = await ctx.run({
                    token: true,
                    model: `${payload.model}_type`,
                    method: "read",
                    query: { filter: { pk: payload.body.type } }
                })
                const type = type_res.data[0]
                let entity = mp[state.entity_type.pool].new(mp.joaat(type.joaat), payload.body.position)
                entity.setVariable("fookieId", payload.response.data._id.toString())
                entity.setVariable("fookie_type", `${payload.model}_type`)
                entity.setVariable("entity_type", state.entity_type.model)

                for (let f in payload.response.data) {
                    entity[f] = payload.response.data[f]
                }
            }
            else if (payload.method == "delete") {
                for (let entity of state.deleteEntities) {
                    let rage_entity = mp[state.entity_type.pool].toArray().find(e => e.getVariable("fookieId") == entity._id.toString())
                    if (rage_entity && mp[state.entity_type.pool].exists(rage_entity.id)) {
                        rage_entity.destroy();
                    }
                }

            }

        }
    })
}
