
//mp.api.model(require("./models/entity.js"))
mp.api.model(require("./models/entity_type.js"))











// SET SYNC METHOD ON MODELS 

mp.events.add('fookie_connected', async () => {

    let entity_types = await mp.api.run({
        user: { system: true },
        method: "getAll",
        model: "entity_type",
        query: {},
        body: {},
    })
    
    entity_types.data.forEach(entity_type => {
        let model = mp.api.models.get(entity_type.model)
        model.methods.set("spawn", async function (payload) {
            //find entity
            let entity = await payload.ctx.run({
                user: { system: true },
                method: "get",
                model: payload.model.name,
                query: payload.query
            })
            if (entity.status != 200) payload.response.errors.push("no spawn entity")
            entity = entity.data

            //find type
            let type = await payload.ctx.run({
                user: { system: true },
                method: "get",
                model: payload.model.name + "_type",
                query: { where: { id: entity.type } }
            })
            if (type.status != 200) payload.response.errors.push("no spawn type")
            type = type.data

            return { type, entity }
        })
    });

});

//SET SPAWN EFFECT
mp.events.add('fookie_connected', async () => {

mp.api.



    mp.api.effect("spawn", async function (payload) {
        console.log("spawn");
    })
});


// READ ALL MODELS  AND SYNC
mp.events.add('fookie_connected', async () => {
    let entity_types = await mp.api.run({
        user: { system: true },
        method: "getAll",
        model: "entity_type",
        query: {},
        body: {},
    })

    entity_types.data.forEach(async (entity_type) => {
        let entities = await mp.api.run({
            user: { system: true },
            method: "getAll",
            model: entity_type.model,
            query: {},
            body: {},
        })

        entities.data.forEach(async (entity) => {
            let res = await mp.api.run({
                user: { system: true },
                method: "spawn",
                model: entity_type.model,
                query: { where: { id: entity.id } },
            })
            console.log("ENTITY SPAWN : " + res.status);
        });
    });
});






