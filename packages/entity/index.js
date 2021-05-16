mp.api.model(require("./models/entity_type.js"))
mp.api.model(require("./models/entity.js"))

// SPAWN METHOD

mp.events.add("fookie_connected", function () {
    let entityModel = mp.api.models.get("entity")
    entityModel.methods.set("spawn", async function (payload) {

        let ragempEntity = payload.target

        let res = mp.api.run({
            user: { system: true },
            model: "entity_type",
            method: "get",
            query: { where: { id: ragempEntity.type } }
        })
        let entity_type = res.data
        let id = ragempEntity.entityId

        res = mp.api.run({
            user: { system: true },
            model: type.model,
            method: "get",
            query: { where: { id: ragempEntity.entityId } }
        })
        let entity = res.data


    })
})



mp.events.add("fookie_connected", function () {
    let res = mp.api.run({
        user: { system: true },
        model: "entity",
        method: "getAll",
    })

    let allEntities = res.data

    for (let entity of allEntities) {
        res = mp.api.run({
            ser: { system: true },
            model: type.model,
            method: "spawn",
            query: { where: { id: entity.id } }
        })
        console.log(res);
    }

})
