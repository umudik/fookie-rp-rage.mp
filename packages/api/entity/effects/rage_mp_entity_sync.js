module.exports = async function (ctx) {
    await ctx.effect({
        name: "rage_mp_entity_sync",
        function: async function (payload) {
            let res = await payload.ctx.run({
                system: true,
                method: "get",
                model: "entity_type",
                query: { where: { model: payload.model } }
            })
            let entity_type = res.data

            if (payload.method == "update") {
                let entity = mp[entity_type.pool].toArray().find(e => e.getVariable("fookieId") == payload.target._id)
                if (entity && mp[entity_type.pool].exists(entity.id)) {
                    for (let f in payload.body) {
                        entity[f] = payload.body[f]
                    }
                }

            }
            else if (payload.method == "spawn" || payload.method == "create") {
                let entity = mp[entity_type.pool].new(payload.type.joaat, payload.target.position)
                entity.setVariable("fookieId", payload.target._id)
                entity.setVariable("entity_type", entity_type._id)

                for (let f in payload.target) {
                    entity[f] = payload.target[f]
                }
            }
            else if (payload.method == "delete" || payload.method == "despawn") {
                let entity = mp[entity_type.pool].toArray().find(e => e.getVariable("fookieId") == payload.target._id)
                if (entity && mp[entity_type.pool].exists(entity.id)) {
                    entity.destroy();
                }
            }

        }
    })
}
