mp.events.add("fookie_connected", async () => {
    mp.api.model(require("./models/faction.js"))
    mp.api.model(require("./models/faction_type.js"))
    mp.api.model(require("./models/member.js"))
    mp.api.model(require("./models/member_type.js"))
})