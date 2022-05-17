mp.helpers = {}

mp.helpers.getEmptyDimension = function () {
    for (; ;) {
        let dimension = Math.floor(Math.random() * 1000 * 1000) + 1
        let count = mp.players.toArray().filter(p => p.dimesion == dimension).length
        if (count == 0) {
            return dimension
        }
    }
}


mp.helpers.callEventInPosition = function (pos, data) {
    const players_in_pos = []
    for (const player of players_in_pos) {
        player.call("event", [data])
    }
}