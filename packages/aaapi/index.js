//let FookieJS = require('fookie');
let FookieJS = require('../../../fookie');

(async () => {
    mp.api = new FookieJS();
    await mp.api.connect("mongodb",{url:'mongodb://localhost:27017/roleplay', options:{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }})
    await mp.api.listen(2626)
    mp.events.call("fookie_connected")
})()




mp.events.add("fookie_connected", async () => {
    mp.api.jobs = new Map()
    mp.api.job = async function (name, job) {
        this.jobs.set(name, job)
    }
    
    mp.api.mixin("entity", require("../entity/mixin/entity.js"))
    mp.api.model(require("../bank/models/atm.js"))
    mp.api.model(require("../bank/models/atm_type.js"))
    mp.api.model(require("../bank/models/bank.js"))
    mp.api.model(require("../bank/models/bank_account.js"))

    mp.api.model(require("../pd/models/punishment"))
    mp.api.model(require("../pd/models/punishment_type"))

    mp.api.model(require("../drop/models/drop"))
    mp.api.model(require("../drop/models/drop_type"))
    mp.api.model(require("../crafting/models/craft"))
    mp.api.model(require("../crafting/models/craft_in"))
    mp.api.model(require("../crafting/models/craft_out"))
    mp.api.model(require("../crafting/models/crafting_table"))

    mp.api.store.set("secret", "secret")
    mp.api.store.set("login", true)
    mp.api.store.set("register", true)

    mp.api.effect("rage_mp_sync", require('./effects/rage_mp_sync'))
    mp.api.store.set('afters', mp.api.store.get('afters').concat(["rage_mp_sync"]))

})

mp.events.addProc('apiProc', async (player, payload) => {
    payload = JSON.parse(payload)
    payload.player = player
    await mp.api.run(payload)
    return JSON.stringify(payload.response)
})

mp.events.addCommand("pos", (player) => {
    player.outputChatBox(player.position + " -pos")
})

mp.events.addCommand("dim", (player) => {
    player.outputChatBox(player.dimension + " -dim")
})

mp.events.addCommand('v', (player) => {
    mp.vehicles.new(mp.joaat("openwheel1"), player.position)
})




