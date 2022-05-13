module.exports = async function (ctx) {

    await ctx.lifecycle({
        name: "apartment_create_door",
        function: async function (payload, ctx, state) {
            const apartment = payload.response.data
            await ctx.run({
                token: true,
                model: "object",
                method: "create",
                body: {
                    joaat: "v_ilev_rc_door2",
                    dimension: 0,
                    position: apartment.position,
                    tag: "opening_door",
                    parent_id: apartment._id.toString()
                }
            })
        }
    })
}