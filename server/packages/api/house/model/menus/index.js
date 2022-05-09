mp.events.add("fookie_connected", async (ctx) => {

    await ctx.run({
        token: true,
        model: "interaction_menu",
        method: "create",
        body: {
            name: "house_join",
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
                player.position = apartment_type.location
            },
        }
    })
})