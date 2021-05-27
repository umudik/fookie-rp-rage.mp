module.exports = async (payload) => {
    payload.model = payload.model.name
    payload.res = undefined
    payload.req = undefined
    payload.ctx = undefined
    mp.players.forEach(
        (player, id) => {
            player.call("apiSync", [JSON.stringify(payload)])
        }
    );

}