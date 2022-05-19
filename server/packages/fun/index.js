
mp.events.add("playerDeath", (player) => {
    player.spawn()
})

mp.events.add("playerJoin", (player) => {
    player.giveWeapon([3220176749, 2210333304], 1000);
})



mp.events.add("login", (player, data) => {
    console.log(1);
    const payload = JSON.parse(data)
    console.log(payload);
})
