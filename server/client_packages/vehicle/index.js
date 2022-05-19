//mp.players.local.setConfigFlag(429, true)


mp.events.callRemote("login", JSON.stringify({
    model: "player",
    method: "login",
    body: {
        email: "umut",
        password: "umut"
    }
}))


