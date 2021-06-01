

mp.api.modify("player_position", require("./modifies/player_position"))

// SPAWN METHOD
mp.events.add("fookie_connected", async function () {
    await mp.api.mixin(require("./models/entity.js"))
    await mp.api.effect("rage_mp_entity_sync", require("./effects/rage_mp_entity_sync.js"))
    await mp.api.model(require("./models/entity_type.js"))


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
            effect: [],
            filter: [],
        }




        model.fookie.spawn = JSON.parse(JSON.stringify(tmp_method))
        model.fookie.despawn = JSON.parse(JSON.stringify(tmp_method))
        model.fookie.save = JSON.parse(JSON.stringify(tmp_method))
        model.fookie.post.modify.push("player_position")

        model.fookie.delete.modify.push("set_target", "set_type")
        model.fookie.post.modify.push("set_target", "set_type")
        model.fookie.patch.modify.push("set_target", "set_type")

        model.fookie.delete.rule.push("need_target", "need_type")
        model.fookie.post.rule.push("need_target", "need_type")
        model.fookie.patch.rule.push("need_target", "need_type")

        model.fookie.delete.effect.push("rage_mp_entity_sync")
        model.fookie.post.effect.push("rage_mp_entity_sync")
        model.fookie.patch.effect.push("rage_mp_entity_sync")
        model.fookie.spawn.effect.push("rage_mp_entity_sync")
        model.fookie.despawn.effect.push("rage_mp_entity_sync")

        model.methods.set("spawn", async function (payload) {
            return true
        })

        model.methods.set("despawn", async function (payload) {
            return true
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
    let _id = payload.target[payload.model.name + "_type"]
    let res = await mp.api.run({
        user: { system: true },
        model: payload.model.name + "_type",
        method: "get",
        query: { where: { _id } }
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
        method: "getAll",
        query: { where: { spawnAtStart: true } }
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
                        _id: entity._id
                    }
                }
            })
        }
    }
})




