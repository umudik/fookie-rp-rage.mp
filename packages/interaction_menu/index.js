mp.events.add("fookie_connected", async function () {
    await mp.api.model(require("./models/interaction_menu.js"))
    let im = mp.api.models.get("interaction_menu")

    im.methods.set("do", async function (payload) {
        console.log("dodododododod");
        console.log(payload.body);
    })
    console.log(im);
})