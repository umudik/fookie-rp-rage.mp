module.exports = async function (payload) {
    let res = await payload.ctx.run({
        user: { system: true },
        method: "get",
        model: "entity_type",
        query: { where: { model: payload.model.name } }
    })
    let entity_type = res.data

    if (payload.method == "patch") {
        let entity = mp[entity_type.pool].toArray().find(e => e.getVariable("fookieID") == payload.target._id)
        if (entity && mp[entity_type.pool].exists(entity.id)) {
            for (let f in payload.body) {
                entity[f] = payload.body[f]
            }
        }

    }
    else if (payload.method == "spawn" || payload.method == "post") {    
        let entity = mp[entity_type.pool].new(payload.type.joaat, payload.target.position)   
        entity.setVariable("fookieID", payload.target._id)
        for (let f in payload.target) {
            entity[f] = payload.target[f]
        }
    }
    else if (payload.method == "delete" || payload.method == "despawn") {
        let entity = mp[entity_type.pool].toArray().find(e => e.getVariable("fookieID") == payload.target._id)
        if (entity && mp[entity_type.pool].exists(entity.id)) {
            entity.destroy();
        }
    }

}