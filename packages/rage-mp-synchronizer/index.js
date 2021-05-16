mp.api.model(require("./models/synchronizer.js"))

// SET SYNC METHOD ON MODELS 

mp.api.use((ctx) => {
    // SPAWN METHOD FOR MODELS
    let _synchronizer = ctx.models.get("synchronizer")
    _synchronizer.methods.set("spawn", async function (payload) {
        let res = await ctx.run({
            user: { system: true },
            method: "get",
            model: "synchronizer",
            query: {
                where: {
                    model: payload.body.model
                }
            },
        })
        let synchronizer = res.data
        res = await ctx.run({
            user: { system: true },
            method: "get",
            model: synchronizer.model,
            query: {
                where: {
                    id: payload.body.id
                }
            },
        })
        let entity = res.data

        res = await ctx.run({
            user: { system: true },
            method: "get",
            model: payload.body.model + "_type",
            query: {
                where: {
                    id: entity.type
                }
            },
        })
        let type = res.data

        let rageEntity = mp[synchronizer.pool].new(mp.joaat(type.joaat), entity.position)
        rageEntity.setVariable({
            fookie: {
                model: payload.body.model,
                id: entity.id
            }
        });
    })
})













// READ ALL MODELS  AND SYNC
mp.events.add('fookie_connected', async () => {
    let res = await mp.api.run({
        user: { system: true },
        method: "getAll",
        model: "synchronizer",
    })
    let all_models = res.data

    for (let synModel of all_models) {
        let entities = await mp.api.run({
            user: { system: true },
            method: "getAll",
            model: synModel.model,
        })
        entities = entities.data
        for (let entity of entities) {
            await mp.api.run({
                user: { system: true },
                method: "spawn",
                model: "synchronizer",
                body: {
                    model: synModel.model,
                    id: entity.id
                }
            })
        }
    }
});


mp.events.add('fookie_connected', async () => {

    mp.api.use((ctx) => {
        let afters = ctx.store.get("afters")
        afters.push("rage-synchronizer-handler")


        ctx.effect("rage-synchronizer-handler", async function (payload) {
            if (["delete", "patch", "post", "spawn"].includes(payload.method)) {
                let rage_mpModels = await mp.api.run({
                    user: { system: true },
                    method: "getAll",
                    model: "synchronizer",
                })
                rage_mpModels = rage_mpModels.data
                console.log(payload.model);
                if (rage_mpModels.map(m => m.model).includes(payload.model)) {
                    console.log("EVET BU BİR RAGE MP MODEL DEĞİŞİKLİĞİ");
                }
            }

        })

    })

});