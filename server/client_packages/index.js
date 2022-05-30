mp.token = "";
let cursor = true;

(async () => {
    const cef_url = await mp.events.callRemoteProc('CEF_URL')
    mp.cef = new mp.browsers.new(cef_url)
})()


let sceneryCamera = mp.cameras.new('default', new mp.Vector3(-485, 1095.75, 323.85), new mp.Vector3(0, 0, 0), 40);
sceneryCamera.pointAtCoord(402.8664, -996.4108, -98.5); // Changes the rotation of the camera to point towards a location
sceneryCamera.setActive(true);
mp.game.cam.renderScriptCams(true, false, 0, true, false);
for (let i = 0; i < 10; i++) {
    mp.game.controls.disableAllControlActions(i);
}

mp.game.ui.displayRadar(false);
mp.gui.chat.show(false);





mp.events.add('apiSync', (payload) => {
    mp.cef.execute(`app.$store.dispatch("apiSync",${payload})`)
})

mp.events.add('CEF_LOGIN', async (payload) => {
    const res = await mp.events.callRemoteProc('login', payload)
    if (res.status) {
        mp.cef.execute(`app.$store.state.token = "${res.data.token}";`)
        mp.game.cam.renderScriptCams(false, false, 0, false, false);
        for (let i = 0; i < 10; i++) {
            mp.game.controls.enableAllControlActions(i);
        }

        mp.gui.chat.show(true);
        cursor = false
    } else {

    }
})

mp.events.addProc('apiProc', async (payload) => {
    mp.gui.chat.push(`[API] ${payload}`)
    return await mp.events.callRemoteProc('apiProc', payload)
})

mp.events.addProc('commit', async (payload) => {
    mp.cef.execute(`app.$store.commit("${payload.name}",${payload.payload})`)
})


mp.keys.bind(0x71, true, function () {
    cursor = !cursor

});

mp.events.add('render', async (payload) => {
    mp.gui.cursor.show(cursor || false, cursor || false);
})

require('./interact_menu/index.js')
