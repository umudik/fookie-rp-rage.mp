mp.events.add("fookie_connected", async (ctx) => {
    await ctx.run({
        token: true,
        model: "interaction_menu",
        method: "create",
        body: {
            name: "apartment_join",
            label: "Join",
            entity_type: "apartment",
            control: async function (character, entity, payload) {
                return true //todo
            },
            job: async function (character, entity, payload) {
                const type_res = await ctx.run({
                    token: true,
                    model: "apartment_type",
                    method: "read",
                    query: {
                        filter: {
                            pk: entity.type
                        }
                    }
                })
                const apartment_type = type_res.data[0]
                character.position = apartment_type.location
                const type = await ctx.remote.random("apartment_exit_door_type")

                const create_exit_res = await ctx.run({
                    token: true,
                    model: "apartment_exit_door",
                    method: "create",
                    body: {
                        type: type._id.toString(),
                        apartment: entity._id.toString(),
                        dimension: entity.fixed_dimension,
                        position: apartment_type.location,
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