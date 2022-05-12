
(async () => {
    const fookie = require("fookie");
    require("dotenv").config();
    await fookie.init()
    fookie.remote = {
        random: async function (model, query = {
            query: {
                filter: {

                }
            }
        }) {
            const res = await fookie.run({
                token: true,
                model,
                method: "read",
                query,
            })
            return res.data[0]
        },
        read: async function (model, query = {
            query: { filter: {} }
        }) {
            const res = await fookie.run({
                token: true,
                model,
                method: "read",
                query,
            })
            return res.data
        }
    }
    await fookie.use(require("fookie-server"))
    await fookie.use(require("fookie-cache").client)

    await fookie.setting({
        name: "mongodb_connection",
        value: {
            url: process.env.MONGO
        }
    })
    await fookie.use(require("fookie-databases").mongodb)

    await fookie.use(require("./entity/export"))
    await fookie.use(require("./character/export"))
    await fookie.use(require("./user/export"))
    await fookie.use(require("./vehicle/export"))
    await fookie.use(require("./inventory/export"))
    await fookie.use(require("./whitelist/export"))
    await fookie.use(require("./shop/export"))
    await fookie.use(require("./object/export"))
    // await fookie.use(require("./crafting/export"))
    await fookie.use(require("./drop/export"))
    await fookie.use(require("./faction/export"))
    await fookie.use(require("./house/export"))
    await fookie.use(require("./interaction_menu/export"))
    await fookie.use(require("./government/export"))
    await fookie.use(require("./phone/export"))
    await fookie.use(require("./marker/export"))

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

    mp.events.addCommand('v', async (player) => {
        let vt_res = await fookie.run({
            token: true,
            model: "vehicle_type",
            method: "read",
        })
        let vt = fookie.lodash.sample(vt_res.data)
        let res = await fookie.run({
            token: true,
            model: "vehicle",
            method: "create",
            body: {
                type: vt._id,
                position: {
                    x: player.position.x,
                    y: player.position.y,
                    z: player.position.z
                },
                dimension: player.dimension,
                color1: [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)],
                color2: [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)],
                mod_spoiler: 3,
                mod_front_bumper: 3,
            }
        })
    })

    mp.events.addCommand('o', async (player) => {
        let t_res = await fookie.run({
            token: true,
            model: "object_type",
            method: "read",
        })
        let t = fookie.lodash.sample(t_res.data)
        let res = await fookie.run({
            token: true,
            model: "object",
            method: "create",
            body: {
                type: t._id.toString(),
                position: {
                    x: player.position.x,
                    y: player.position.y,
                    z: player.position.z
                },
                dimension: player.dimension
            }
        })
    })

    mp.events.addCommand('t', async (player) => {
        console.log(player.position);
        player.position = new mp.Vector3(0, 0, 72.5);
    })



    mp.events.addCommand('ap', async (player) => {
        let t_res = await fookie.run({
            token: true,
            model: "apartment_type",
            method: "read",
        })
        let t = fookie.lodash.sample(t_res.data)
        let res = await fookie.run({
            token: true,
            model: "apartment",
            method: "create",
            body: {
                name: "Umut APT" + Math.random(),
                type: t._id,
                fixed_dimension: Math.round(Math.random() * 9999999999),
                position: {
                    x: player.position.x,
                    y: player.position.y,
                    z: player.position.z
                },
                dimension: player.dimension,
            }
        })
        console.log(res);
    })


    mp.events.addCommand('marker', async (player) => {
        let t_res = await fookie.run({
            token: true,
            model: "marker_type",
            method: "read",
        })
        let t = fookie.lodash.sample(t_res.data)
        let res = await fookie.run({
            token: true,
            model: "marker",
            method: "create",
            body: {
                type: t._id,
                position: {
                    x: player.position.x,
                    y: player.position.y,
                    z: player.position.z
                },
                dimension: player.dimension,
            }
        })
        console.log(res);
    })



})()

