
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
        model.methods.set("sync", async function (payload) {

        })
    });

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
        console.log(entities);
        entities.data.forEach(async (entity) => {
            let res = await mp.api.run({
                user: { system: true },
                method: "sync",
                model: entity_type.model,
                query: { where: { id: entity.id } },
            })
            console.log("ENTITY SYNC : " + res.status);
        });
    });
});






