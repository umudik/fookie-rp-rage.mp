mp.api.model(require("./models/entity_type.js"))
mp.api.model(require("./models/entity.js"))

// SPAWN METHOD
mp.events.add("fookie_connected", function () {
    let entityModel = mp.api.models.get("entity")
    entityModel.methods.set("spawn", async function (payload) {

        let ragempEntity = payload.target

        let res = await mp.api.run({
            user: { system: true },
            model: "entity_type",
            method: "get",
            query: { where: { id: ragempEntity.type } }
        })

        let entity_type = res.data

        res = await mp.api.run({
            user: { system: true },
            model: entity_type.model,
            method: "get",
            query: { where: { id: ragempEntity.entityId } }
        })
        let entity = res.data

        res = await mp.api.run({
            user: { system: true },
            model: entity_type.model + "_type",
            method: "get",
            query: { where: { id: entity.type } }
        })
        let type = res.data

        let ragempInGameEntity = mp[entity_type.pool].new(type.joaat, ragempEntity.position, ragempEntity.data)


        let fileds = Object.keys(payload.model.schema)
        for (let f of fileds) {

            if (["dimension", "position", "entityId"].includes(f))
                ragempInGameEntity[f] = ragempEntity[f]
        }
        return ragempInGameEntity
    })

    entityModel.methods.set("find", async function (payload) {
        let entity = payload.target
        let res = await mp.api.run({
            user: { system: true },
            model: "entity_type",
            method: "get",
            query: { where: { id: entity.type } }
        })

        let entity_type = res.data
        let ret = mp[entity_type.pool].toArray().find(e => e.entityId === entity.entityId)
        return ret
    })

    entityModel.methods.set("save", async function (payload) {

        let ragempInGameEntity = await mp.api.run({
            user: { system: true },
            model: "entity",
            method: "find",
            query: { where: { id: payload.target.id } }
        })
        ragempInGameEntity = ragempInGameEntity.data

        let fileds = Object.keys(payload.model.schema)
        let body = {}
        for (let f of fileds) {
            body[f] = ragempInGameEntity[f]
        }
        delete body.type
        delete body.model
        let res = await mp.api.run({
            user: { system: true },
            model: "entity",
            method: "patch",
            body,
            query: { where: { id: payload.target.id } }
        })
        return res

    })
})



mp.events.add("fookie_connected", async function () {
    let res = await mp.api.run({
        user: { system: true },
        model: "entity",
        method: "getAll",
    })

    let allEntities = res.data

    for (let entity of allEntities) {
        res = await mp.api.run({
            user: { system: true },
            model: "entity",
            method: "spawn",
            query: { where: { id: entity.id } }
        })
        console.log("[Spawn] " + res.data);
    }
})


mp.events.add("playerJoin", (player) => {
    player.outputChatBox(player.dimension + "-")
})


mp.api.routine("test", 30000, async (ctx) => {
    let res = await mp.api.run({
        user: { system: true },
        model: "entity",
        method: "getAll",
    })
    res = res.data

    for (let e of res) {
        let res = await mp.api.run({
            user: { system: true },
            model: "entity",
            method: "get",
            query: { where: { id: e.id } }
        })
        console.log(res.status);
    }
})
