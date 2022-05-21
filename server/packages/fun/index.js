mp.events.add("fookie_connected", async (ctx) => {
    mp.events.add("playerDeath", (player) => {
        player.spawn()
    })

    mp.events.add("playerJoin", (player) => {
        player.giveWeapon([3220176749, 2210333304], 1000);
    })
})

mp.events.add("s", (player) => {
    player.spawn()
})





mp.events.add("playerJoin", (player) => {
    player.cloth_eye = 5
    player.cloth_foot = 12
    player.cloth_hand = 7
    player.cloth_legs = 5
    player.cloth_hair = 7
})