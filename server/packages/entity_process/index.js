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



    let i = 0

    // SAVE ENTITIES TO DB CRONJOB
    setInterval(async () => {
        console.log("VEHICLES SAVED...");
        mp.vehicles.forEach(async function (entity) {
            const speed = Math.abs(entity.velocity.x) + Math.abs(entity.velocity.y) + Math.abs(entity.velocity.z)
            if (entity.getVariable("fookie_id") && speed < 0.1) {
                ctx.run({
                    token: true,
                    model: "vehicle",
                    method: "update",
                    query: {
                        filter: {
                            pk: entity.getVariable("fookie_id"),
                        }
                    },
                    body: {
                        position: entity.position,
                        heading: entity.heading,
                        rotation: entity.rotation
                    }
                });
            }
        })
    }, 60 * 60 * 1000)

    mp.events.add("playerExitVehicle", async function (player, entity) {
        let res = await ctx.run({
            token: true,
            model: "vehicle",
            method: "update",
            query: {
                filter: {
                    pk: entity.getVariable("fookie_id"),
                }
            },
            body: {
                position: entity.position,
                heading: entity.heading,
                rotation: entity.rotation
            }
        });
    })

})