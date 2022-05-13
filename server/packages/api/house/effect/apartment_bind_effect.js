module.exports = async function (ctx) {

    await ctx.lifecycle({
        name: "apartment_bind_effect",
        function: async function (payload, ctx, state) {
            const apartment = payload.response.data
            console.log(apartment);
            const apartment_type_res = await ctx.run({
                token: true,
                model: "apartment_type",
                method: "read",
                query: {
                    filter: {
                        pk: apartment.type
                    }
                }
            })
            console.log(apartment_type_res, "apartment_type_res");
            const apartment_type = apartment_type_res.data[0]
            const create_opening_door_res = await ctx.run({
                token: true,
                model: "object",
                method: "create",
                body: {
                    joaat: "v_ilev_rc_door2",
                    dimension: 0,
                    position: apartment.position,
                    tag: "create_opening_door",
                }
            })

            console.log(create_opening_door_res, "create_o_door_res");
        }
    })
}