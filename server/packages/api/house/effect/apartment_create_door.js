module.exports = async function (ctx) {

    await ctx.lifecycle({
        name: "apartment_create_door",
        async: false,
        function: async function (payload, ctx, state) {
            const apartment = payload.response.data
            const door = await ctx.run({
                token: true,
                model: "object",
                method: "create",
                body: {
                    joaat: "v_ilev_rc_door2",
                    dimension: 0,
                    position: apartment.position,
                    tag: "opening_door",
                    parent_id: apartment._id
                }
            })
            const apartment_u_res = await ctx.run({
                token: true,
                model: "apartment",
                method: "update",
                query: {
                    filter: {
                        pk: apartment._id
                    }
                },
                body: {
                    door: door.data._id
                }
            })
            console.log(apartment_u_res);
        }
    })
}