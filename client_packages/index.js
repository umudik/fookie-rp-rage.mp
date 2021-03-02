let cef = new mp.browsers.new('http://localhost:8080')


mp.events.add('api', (payload) => {
    cef.execute(`app.$store.commit("api",${payload})`)
})


mp.events.addProc('local', async(payload) => {
    let res = await mp.events.callRemoteProc('api', payload)
    return res
})

let cursor = false
mp.keys.bind(0x71, true, function() {
    cursor = !cursor
    mp.gui.cursor.show(cursor, cursor);
});