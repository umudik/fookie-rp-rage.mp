let cef = new mp.browsers.new('http://localhost:8080')
cef.execute(`app.$store.state.inGame = true;`)

mp.events.add('apiSync', (payload) => {
    cef.execute(`app.$store.dispatch("apiSync",${payload})`)
})

mp.events.addProc('apiProc', async (payload) => {
    return await mp.events.callRemoteProc('apiProc', payload)
})

mp.events.addProc('commit', async (payload) => {
    cef.execute(`app.$store.commit("${payload.name}",${payload.payload})`)
})

let cursor = false
mp.keys.bind(0x71, true, function () {
    cursor = !cursor
    mp.gui.cursor.show(cursor, cursor);
});

require('./interact_menu/index.js')
require('./vehicle/index.js')