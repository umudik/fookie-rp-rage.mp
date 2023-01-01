(async () => {
    mp.accept_connections = false
    if (typeof process.env.DATABASE != "string") {
        require("dotenv").config();
    }

    const fookie = require("fookie");
    await fookie.init()
    mp.fookie = fookie
    await fookie.use(require("fookie-server"))

    await fookie.use(require("./global/export"))
    await fookie.use(require("./interaction_menu/export"))
    await fookie.use(require("./entity/export"))
    await fookie.use(require("./player/export"))
    await fookie.use(require("./vehicle/export"))
    await fookie.use(require("./inventory/export"))
    await fookie.use(require("./shop/export"))
    await fookie.use(require("./crafting/export"))
    await fookie.use(require("./drop/export"))
    await fookie.use(require("./faction/export"))
    await fookie.use(require("./house/export"))
    await fookie.use(require("./government/export"))
    await fookie.use(require("./phone/export"))
    await fookie.use(require("./auth/index.js"))
    await fookie.use(require("./db_sync/index.js"))
    await fookie.use(require("./ui/export.js"))




    // ADD SOMETHINGS
    await fookie.use(require("./house/menus/index.js"))
    await fookie.listen(3434)

    mp.events.addProc('apiProc', async (player, payload) => {
        payload = JSON.parse(payload)
        await fookie.run(payload, { player })
        return JSON.stringify(payload.response)
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

    mp.events.addCommand("vehicle", async (player) => {
        const t = await fookie.remote.random("vehicle_type")
        let res = await fookie.run({
            token: true,
            model: "vehicle",
            method: "create",
            body: {
                joaat: t.joaat,
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

    mp.events.addCommand("object", async (player) => {
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

    mp.accept_connections = true
})()

