module.exports = async (ctx) => {
    await ctx.run({
        token: true,
        model: "interaction_menu",
        method: "create",
        body: {
            name: "apartment_join",
            label: "Join",
            close_on_click: true,
            tag: "opening_door",
            control: async function (character, payload, im) {
                return true //todo
            },
            job: async function (character, payload, im) {

                const door = await ctx.remote.get("object", payload.fookie_id)
                const apartment = await ctx.remote.get("apartment", door.parent_id)
                const apartment_type = await ctx.remote.get("apartment_type", apartment.type)

                character.position = apartment_type.location
                character.dimension = apartment.fixed_dimension

                await ctx.run({
                    token: true,
                    model: "object",
                    method: "create",
                    body: {
                        joaat: "v_ilev_rc_door2",
                        dimension: apartment.fixed_dimension,
                        position: apartment_type.location,
                        tag: "exit_door",
                        parent_id: apartment._id
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
            tag: "exit_door",
            close_on_click: true,
            control: async function (character, payload, im) {
                return true //todo
            },
            job: async function (character, payload, im) {
                const door = await ctx.remote.get("object", payload.fookie_id)
                const apartment = await ctx.remote.get("apartment", door.parent_id)
                const apartment_type = await ctx.remote.get("apartment_type", apartment.type)

                character.position = apartment.position
                character.dimension = 0
                await ctx.remote.delete("object", door._id)

            },
        }
    })




}


