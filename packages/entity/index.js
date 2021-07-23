

mp.api.modify("player_position", require("./modifies/player_position"))

// SPAWN METHOD
mp.events.add("fookie_connected", async function () {
    await mp.api.effect("rage_mp_entity_sync", require("./effects/rage_mp_entity_sync.js"))
    await mp.api.model(require("./models/entity_type.js"))


    let res = await mp.api.run({
        system:true,
        model: "entity_type",
        method: "getAll"
    })
    entity_types = res.data


    for (let entity_type of entity_types) {
        let model = mp.api.models.get(entity_type.model)

        model.methods.set("spawn", async function (payload) {
            return true
        })

        model.methods.set("despawn", async function (payload) {
            return true
        })

        model.methods.set("save", async function (payload) { //TO DO getvriable setvariable change
            if (mp[entity_type.pool].exists(payload.target.fookieID)) {
                let entity = mp[entity_type.pool].at(payload.target.fookieID)
                let body = {}

                for (let key of Object.keys(payload.model.schema)) {
                    if (entity[key] != payload.target[key]) {
                        body[key] = entity[key]
                    }
                }

                mp.api.run({
                    system: true ,
                    model: payload.model,
                    method: "patch",
                    body
                })
            }
        })
    }



    res = await mp.api.run({
        system: true ,
        model: "entity_type",
        method: "getAll",
        query: { where: { spawnAtStart: true } }
    })
    entity_types = res.data


    for (let entity_type of entity_types) {
        let res = await mp.api.run({
            system: true ,
            method: "getAll",
            model: entity_type.model,

        })

        let allEntites = res.data

        for (let entity of allEntites) {
            mp.api.run({
                system: true ,
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




mp.api.modify("set_type", async function (payload) {
    let _id = payload.target[payload.model + "_type"]
    let res = await mp.api.run({
        system: true ,
        model: payload.model + "_type",
        method: "get",
        query: { where: { _id } }
    })
    payload.type = res.data

})

mp.api.rule("need_type", async function (payload) {
    return typeof payload.type == "object"
})




