module.exports = (ctx) => {
    mp.events.add("fookie_connected", async (ctx) => {
        await ctx.run({
            token: true,
            model: "interaction_menu",
            method: "create",
            body: {
                name: "destroy_vehicle",
                label: "Destroy Vehicle",
                close_on_click: true,
                entity_type: "vehicle",
                control: async function (character, entity, payload) {
                    return true //todo
                },
                job: async function (character, entity, payload) {
                    await ctx.run({
                        token: true,
                        model: "vehicle",
                        method: "delete",
                        query: {
                            filter: {
                                pk: entity._id.toString()
                            }

                        }
                    })
                },
            }
        })


        await ctx.run({
            token: true,
            model: "interaction_menu",
            method: "create",
            body: {
                name: "apartment_exit",
                label: "Exit",
                entity_type: "apartment_exit_door",
                close_on_click: true,
                control: async function (character, entity, payload) {
                    return true //todo
                },
                job: async function (character, entity, payload) {
                    const apartment_res = await ctx.run({
                        token: true,
                        model: "apartment",
                        method: "read",
                        query: {
                            filter: {
                                pk: entity.apartment
                            }
                        }
                    })

                    const apartment = apartment_res.data[0]
                    character.position = apartment.position
                    console.log(apartment);
                    mp.players.forEach(async player => {
                        if (player.dimension === apartment.fixed_dimension) {
                            return

                        }
                    })
                    const exit_res = await ctx.run({
                        token: true,
                        model: "apartment_exit_door",
                        method: "delete",
                        query: {
                            filter: {
                                apartment: apartment._id.toString()
                            }
                        }
                    })
                },
            }
        })






    })
}
