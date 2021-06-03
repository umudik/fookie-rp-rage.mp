mp.events.add('fookie_connected', async function () {
    await mp.api.model(require("../character/models/character.js"))


    mp.api.routine("player_hungry", 30 * 1000, async function (ctx) {
        mp.players.forEach((player) => {
            let hungry = player.getVariable("hungry")
            if (hungry > 0) {
                hungry--
                player.setVariable("hungry", hungry)
            }
        });
    })
})