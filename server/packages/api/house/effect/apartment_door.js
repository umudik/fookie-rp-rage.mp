module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "apartment_door",
        function: async function (payload, ctx, state) {
            if (payload.method == "create") {
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
                        parent_id: apartment._id
                    }
                })
            } else if (payload.method == "update") {
                for (let entity of state.computed_data) {
                    await ctx.run({
                        token: true,
                        model: "object",
                        method: "update",
                        query: {
                            filter: {
                                parent_id: entity._id,
                                tag: "opening_door"
                            }
                        },
                        body: {
                            position: entity.position,
                        }
                    })

                }
            }
            else if (payload.method == "delete") {
                for (let entity of state.computed_data) {
                    await ctx.run({
                        token: true,
                        model: "object",
                        method: "delete",
                        query: {
                            filter: {
                                parent_id: entity._id,
                                tag: "opening_door"
                            }
                        }

                    })
                    await ctx.run({
                        token: true,
                        model: "object",
                        method: "delete",
                        query: {
                            filter: {
                                parent_id: entity._id,
                                tag: "exit_door"
                            }
                        }
                    })
                }
            }
        }
    })
}