mp.events.add("fookie_connected", async function () {
    await mp.api.model(require("./models/interaction_menu.js"))
    let im = mp.api.models.get("interaction_menu")

    im.methods.set("do", async function (payload) {
        console.log(payload.body);
        let res = await payload.ctx.run({
            user: { system: true },
            method: "get",
            model: "interaction_menu",
            query: {
                where: {
                    _id: payload.body.interaction_menu
                }
            }
        })
        let interaction_menu = res.data

        if (interaction_menu.type == "patch") {
            res = await payload.ctx.run({
                user: { system: true },
                method: "get",
                model: "entity_type",
                query: {
                    where: {
                        _id: payload.body.entity_type
                    }
                }
            })
            let entity_type = res.data

            res = await payload.ctx.run({
                user: { system: true },
                method: "get",
                model: entity_type.model,
                query: {
                    where: {
                        _id: payload.body.fookieID
                    }
                }
            })

            let entity = res.data
            mp.api.jobs.get(interaction_menu.job)({ entity })

        } else if (interaction_menu.type == "menu") {

        }

    })

    mp.api.job("engine_on", function ({ entity }) {
        mp.api.run({
            user: { system: true },
            method: "patch",
            model: "vehicle",
            query: { where: { _id: entity._id } },
            body: {
                ragemp_engine: true,
            }
        })
    })


    mp.api.job("engine_off", function ({ entity }) {
        mp.api.run({
            user: { system: true },
            method: "patch",
            model: "vehicle",
            query: { where: { _id: entity._id } },
            body: {
                ragemp_engine: false,
            }
        })
    })
})


mp.events.addCommand("veh_engine", (player) => {
    player.vehicle.ragemp_engine = true
})