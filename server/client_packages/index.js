mp.token = "";
let cursor = true;

(async () => {
    const cef_url = await mp.events.callRemoteProc('CEF_URL')
    const api_url = await mp.events.callRemoteProc('API_URL')
    mp.cef = new mp.browsers.new(cef_url)
    mp.cef.execute(`app.$store.state.API_URL = "${api_url}"`)
})()


let sceneryCamera = mp.cameras.new('default', new mp.Vector3(-485, 1095.75, 323.85), new mp.Vector3(0, 0, 0), 40);
sceneryCamera.pointAtCoord(402.8664, -996.4108, -98.5); // Changes the rotation of the camera to point towards a location
sceneryCamera.setActive(true);
mp.game.cam.renderScriptCams(true, false, 0, true, false);

mp.game.controls.disableAllControlActions(0);

mp.game.ui.displayRadar(false);
mp.gui.chat.show(false);





mp.events.add('apiSync', (payload) => {
    mp.cef.execute(`app.$store.dispatch("apiSync",${payload})`)
})

mp.events.add('CEF_LOGIN', async (payload) => {
    const res = await mp.events.callRemoteProc('login', payload)
    if (res.status) {
        mp.cef.execute(`app.$store.state.token = "${res.data.token}";`)
        mp.cef.execute(`app.$store.state.player_id = "${res.data.id}";`)
        mp.game.cam.renderScriptCams(false, false, 0, false, false);

        mp.game.controls.enableAllControlActions(0);

        mp.gui.chat.show(true);
        cursor = false
    } else {

    }
})

mp.events.addProc('apiProc', async (payload) => {
    const res = await mp.events.callRemoteProc('apiProc', payload)
    mp.gui.chat.push(`[API] ${typeof res}`)
    return res
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
