module.exports = async (ctx) => {
    // SPAWN ALL ENTITIES
    let res = await ctx.run({
        token: true,
        model: "entity_type",
        method: "read",
        query: {
            filter: {
                spawnAtStart: true
            }
        }

    })
    const entity_types = res.data
    for (let entity_type of entity_types) {
        await ctx.run({
            token: true,
            model: entity_type.model,
            method: "update",
            query: {
                filter: {

                }
            },
            body: {
                spawned: false,
            }
        })
        await ctx.run({
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
    }

    // SAVE ENTITIES TO DB CRONJOB
    setInterval(async () => {
        mp.vehicles.forEach(async function (entity) {
            const speed = Math.abs(entity.velocity.x) + Math.abs(entity.velocity.y) + Math.abs(entity.velocity.z)
            if (entity.getVariable("fookie_id") && speed < 0.13) {
                console.log("VEHICLES SAVED... ", entity.getVariable("fookie_id"));
                ctx.run({
                    token: true,
                    model: "vehicle",
                    method: "update",
                    options: {
                        dont_sync: true
                    },
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
    }, 10 * 60 * 1000)

    mp.events.add("playerExitVehicle", async function (player, entity) {
        let res = await ctx.run({
            token: true,
            model: "vehicle",
            method: "update",
            options: {
                dont_sync: true
            },
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

}