

mp.api.modify("player_position", require("./modifies/player_position"))

// SPAWN METHOD
mp.events.add("fookie_connected", async function () {
    let res = await mp.api.run({
        user: { system: true },
        model: "entity_type",
        method: "getAll"
    })
    entity_types = res.data

    for (let entity_type of entity_types) {
        let model = mp.api.models.get(entity_type.model)

        let tmp_method = {
            modify: ["set_target", "set_type"],
            rule: ["need_target", "need_type"],
            role: ["system_admin"],
        }
        model.fookie.spawn = tmp_method
        model.fookie.despawn = tmp_method
        model.fookie.save = tmp_method
        model.fookie.post.modify.push("player_position")


        model.methods.set("spawn", async function (payload) {
            let entity = mp[entity_type.pool].new(payload.type.joaat, payload.target.position)
            entity.setVariable("fookieID", payload.target.position._id)

            for (let key of Object.keys(payload.model.schema)) {
                entity[key] = payload.target[key]
            }
        })

        model.methods.set("despawn", async function (payload) {
            if (mp[entity_type.pool].exists(payload.target.fookieID)) {
                let entity = mp[entity_type.pool].at(payload.target.fookieID)
                entity.destroy();
            }

        })

        model.methods.set("save", async function (payload) {
            if (mp[entity_type.pool].exists(payload.target.fookieID)) {
                let entity = mp[entity_type.pool].at(payload.target.fookieID)
                let body = {}

                for (let key of Object.keys(payload.model.schema)) {
                    if (entity[key] != payload.target[key]) {
                        body[key] = entity[key]
                    }
                }

                mp.api.run({
                    user: { system: true },
                    model: payload.model.name,
                    method: "patch",
                    body
                })
            }
        })
    }

})




mp.api.modify("set_type", async function (payload) {
    let id = payload.target[payload.model.name + "_type"]
    let res = await mp.api.run({
        user: { system: true },
        model: payload.model.name + "_type",
        method: "get",
        query: { where: { id } }
    })
    payload.type = res.data

})

mp.api.rule("need_type", async function (payload) {
    return typeof payload.type == "object"
})

mp.events.add("fookie_connected", async function () {
    let res = await mp.api.run({
        user: { system: true },
        model: "entity_type",
        method: "getAll"
    })
    entity_types = res.data

    for (let entity_type of entity_types) {
        let res = await mp.api.run({
            user: { system: true },
            method: "getAll",
            model: entity_type.model,

        })

        let allEntites = res.data

        for (let entity of allEntites) {
            mp.api.run({
                user: { system: true },
                method: "spawn",
                model: entity_type.model,
                query: {
                    where: {
                        id: entity._id
                    }
                }
            })
        }
    }
})




