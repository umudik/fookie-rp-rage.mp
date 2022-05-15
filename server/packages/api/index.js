
(async () => {
    const lodash = require("lodash")
    const fookie = require("fookie");
    await fookie.init()

    await fookie.use(require("fookie-server"))
    await fookie.use(require("fookie-cache").client)

    await fookie.setting({
        name: "mongodb_connection",
        value: {
            url: process.env.MONGO
        }
    })
    await fookie.use(require("./global/export"))
    await fookie.use(require("fookie-databases").mongodb)
    await fookie.use(require("./interaction_menu/export"))
    await fookie.use(require("./entity/export"))
    await fookie.use(require("./character/export"))
    await fookie.use(require("./user/export"))
    await fookie.use(require("./vehicle/export"))
    await fookie.use(require("./inventory/export"))
    await fookie.use(require("./whitelist/export"))
    await fookie.use(require("./shop/export"))
    // await fookie.use(require("./crafting/export"))
    await fookie.use(require("./drop/export"))
    await fookie.use(require("./faction/export"))
    await fookie.use(require("./house/export"))

    await fookie.use(require("./government/export"))
    await fookie.use(require("./phone/export"))

    await fookie.listen(3434)

    mp.events.call("fookie_connected", fookie)




    mp.events.addProc('apiProc', async (player, payload) => {
        payload = JSON.parse(payload)
        await fookie.run(payload)
        return JSON.stringify(payload.response)
    })


    mp.events.addCommand("pos", (player) => {
        console.log(player.position);
        player.outputChatBox(player.position + " -pos")
    })

    mp.events.addCommand("dim", (player) => {
        player.outputChatBox(player.dimension + " -dim")
    })
    mp.events.addCommand('i', async (player) => {
        let res = await fookie.run({
            token: true,
            model: "interaction_menu",
            method: "read",
            query: {
                filter: {
                }
            },
        })
    })

    mp.events.addCommand("v", async (player) => {
        let res = await fookie.run({
            token: true,
            model: "vehicle",
            method: "create",
            body: {
                joaat: lodash.sample(["zentorno", "turismor", "banshee2", "jester3"]),
                position: {
                    x: player.position.x,
                    y: player.position.y,
                    z: player.position.z
                },
                tag: "vehicle",
                parent_id: "-",
                dimension: 0,
                color1: [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)],
                color2: [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)],
                mod_spoiler: 3,
                mod_front_bumper: 3,
            }
        })
    })

    mp.events.addCommand("o", async (player) => {
        let res = await fookie.run({
            token: true,
            model: "object",
            method: "create",
            body: {
                joaat: "bkr_prop_meth_sacid",
                position: {
                    x: player.position.x,
                    y: player.position.y,
                    z: player.position.z
                },
                parent_id: "-",
                tag: "object",
                dimension: player.dimension
            }
        })
    })

    mp.events.addCommand("t", async (player) => {
        player.position = new mp.Vector3(0, 0, 72.5);
        player.dimension = 0
    })

    mp.events.addCommand('marker', async (player) => {

        let res = await fookie.run({
            token: true,
            model: "marker",
            method: "create",
            body: {
                joaat: Math.round(Math.random() * 43) + 1,
                color: [0, 123, 123, 255],
                position: {
                    x: player.position.x,
                    y: player.position.y,
                    z: player.position.z
                },
                parent_id: "-",
                dimension: player.dimension,
            }
        })
    })

    mp.events.addCommand('blip', async (player) => {
        let res = await fookie.run({
            token: true,
            model: "blip",
            method: "create",
            body: {
                parent_id: "-",
                joaat: Math.round(Math.random() * 43) + 1,
                color: 13,
                position: player.position,
                dimension: player.dimension,
            }
        })
    })

    mp.events.addCommand('colshape', async (player) => {
        let res = await fookie.run({
            token: true,
            model: "colshape",
            method: "create",
            body: {
                joaat: 40,
                type: "circle",
                position: player.position,
                dimension: player.dimension,
            }
        })
    })

    mp.events.addCommand('label', async (player) => {
        let res = await fookie.run({
            token: true,
            model: "label",
            method: "create",
            body: {
                text: "EXAMPLE TEXT " + Math.round(Math.random() * 100),
                position: player.position,
                dimension: player.dimension,
            }
        })
    })

    mp.events.addCommand('checkpoint', async (player) => {
        let res = await fookie.run({
            token: true,
            model: "checkpoint",
            method: "create",
            body: {
                joaat: 1,
                position: player.position,
                dimension: player.dimension,
            }
        })
    })


    mp.events.add("playerEnterColshape", (player, shape) => {
        console.log("BİR COLSHAPE GİRİLDİ-------");
        console.log(shape);
        console.log("------------------------");
    });


    mp.events.addCommand('apart', async (player) => {
        let res = await fookie.run({
            token: true,
            model: "apartment",
            method: "create",
            body: {
                name: "apartmanet " + Math.round(Math.random() * 99100),
                type: await fookie.remote.random("apartment_type"),
                position: player.position,
                fixed_dimension: Math.round(Math.random() * 999991434),
            }
        })
    })
})()

