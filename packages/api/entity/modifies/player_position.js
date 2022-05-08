module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "player_position",
        function: async function (payload, ctx) {
            if (!payload.hasOwnProperty("player")) {
                payload.response.errors.push("there is no player to player_position")
                return
            }
            if (payload.model.schema.hasOwnProperty("position") && payload.player.hasOwnProperty("position")) {
                payload.body.position = payload.player.position
            } else {
                payload.response.errors.push("doesnt have player position")
            }
        }
    })


}