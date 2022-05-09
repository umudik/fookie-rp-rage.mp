mp.events.add("fookie_connected", async (ctx) => {
    // SPAWN ALL ENTITIES
    let res = await ctx.run({
        token: true,
        model: "entity_type",
        method: "read",

    })
    entity_types = res.data
    for (let entity_type of entity_types) {
        await ctx.run({
            token: true,
            model: entity_type.model,
            method: "update",
            query: {
                filter: {
                    spawned: true,
                }
            },
            body: {
                spawned: false,
            }
        })
        let r_2 = await ctx.run({
            token: true,
            model: entity_type.model,
            method: "update",
            query: {
                filter: {

                }
            },
            body: {
                spawned: true,
            }
        })
        console.log(r_2);
    }









    // SAVE ENTITIES TO DB CRONJOB
    setInterval(async () => {
        for (let entity_type of entity_types) {
        }
    })

}, 5000)