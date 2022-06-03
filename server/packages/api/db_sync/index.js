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
        mp.vehicles.forEach(async function (vehicle) {
            if (vehicle.getVariable("fookie_id")) {
                ctx.run({
                    token: true,
                    model: "vehicle",
                    method: "update",
                    options: {
                        dont_sync: true
                    },
                    query: {
                        filter: {
                            pk: vehicle.getVariable("fookie_id"),
                        }
                    },
                    body: {
                        position: vehicle.position,
                        heading: vehicle.heading,
                        rotation: vehicle.rotation
                    }
                });
            }
        })
        mp.players.forEach(async function (player) {
            if (player.getVariable("fookie_id")) {
                ctx.run({
                    token: true,
                    model: "player",
                    method: "update",
                    options: {
                        dont_sync: true
                    },
                    query: {
                        filter: {
                            pk: player.getVariable("fookie_id"),
                        }
                    },
                    body: {
                        position: player.position,
                        heading: player.heading,
                    }
                });
            }
        })
    }, 4 * 60 * 1000)

    mp.events.add("playerExitVehicle", async function (player, entity) {
        await ctx.run({
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


    mp.events.add("playerQuit", async (player) => {
        if (player.getVariable("fookie_id")) {
            ctx.run({
                token: true,
                model: "player",
                method: "update",
                options: {
                    dont_sync: true
                },
                query: {
                    filter: {
                        pk: player.getVariable("fookie_id"),
                    }
                },
                body: {
                    position: player.position,
                    heading: player.heading,
                }
            });
        }
    });

}