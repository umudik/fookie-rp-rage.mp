mp.api.model(require("./models/entity_type.js"))

// SET SYNC METHOD ON MODELS 




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
        let types = await mp.api.run({
            user: { system: true },
            method: "getAll",
            model: entity_type.model + "_type",
            query: {}
        })

        entities.data.forEach(async (entity) => {
            if (entity.type) {
                mp[entity_type.pool].new(mp.joaat(types.data.find(t => t.id == entity.type).joaat), entity.position)
            } else {
                console.log("typeless entity");
                //throw Error("Typeless Entity")
            }
        });
    });
});
