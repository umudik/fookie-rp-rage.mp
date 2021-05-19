const entity = require("./models/entity.js")

mp.api.model(require("./models/entity_type.js"))
mp.api.model(require("./models/entity.js"))
mp.api.effect("rage_mp_entity_sync", require("./effects/rage_mp_entity_sync.js"))

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



        model.methods.set("spawn", async function (payload) {
            console.log(payload.type, "type");
            let entity = mp[entity_type.pool].new(payload.type.joaat, payload.target.position)
            entity.setVariable("fookieID", payload.target.position.id)

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




mp.events.add("fookie_connected", async function () {
    mp.api.modify("set_type", async function (payload) {
        let id = payload.target[payload.model.name + "_type"]
        console.log(payload.model.name, "idididdd");
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
                        id: entity.id
                    }
                }
            })
        }
    }
})




