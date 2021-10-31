mp.events.add("fookie_connected", async function () {
    await ctx.model(require("./models/interaction_menu.js"))
    let im = ctx.models.get("interaction_menu")

    im.methods.set("do", async function (payload) {
        console.log(payload.body);
        let res = await payload.ctx.run({
            system: true,
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
                system: true,
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
                system: true,
                method: "get",
                model: entity_type.model,
                query: {
                    where: {
                        _id: payload.body.fookieID
                    }
                }
            })

            let entity = res.data
            ctx.jobs.get(interaction_menu.job)({ entity, entity_type, payload })


        } else if (interaction_menu.type == "menu") {
            return true
        }



    })
    ctx.job("engine_on", function ({ entity }) {
        ctx.run({
            system: true,
            method: "patch",
            model: "vehicle",
            query: { where: { _id: entity._id } },
            body: {
                ragemp_engine: true,
            }
        })
    })


    ctx.job("engine_off", function ({ entity, entity_type }) {
        ctx.run({
            system: true,
            method: "patch",
            model: entity_type.model,
            query: { where: { _id: entity._id } },
            body: {
                ragemp_engine: false,
            }
        })
    })


    ctx.job("move", function ({ entity, entity_type, payload }) {
        ctx.run({
            system: true,
            method: "patch",
            model: entity_type.model,
            query: { where: { _id: entity._id } },
            body: {
                position: payload.body
            },
        })
    })
})


mp.events.addCommand("veh_engine", (player) => {
    player.vehicle.ragemp_engine = true
})