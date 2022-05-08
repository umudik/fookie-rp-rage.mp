module.exports = async function (ctx) {
    await ctx.use(require("./models/interaction_menu.js"))

    await ctx.run({
        token: true,
        model: "interaction_model",
        method: "create",
        body: {
            name: "engine_on",
            label: "Engine On",
            control: async function (character, entity) {
                return true //todo
            },
            job: async function (character, entity) {
                ctx.run({
                    token: true,
                    method: "update",
                    model: "vehicle",
                    query: { pk: entity.fookieId },
                    body: {
                        ragemp_engine: true,
                    }
                })
            },
        }
    })


    await ctx.run({
        token: true,
        model: "interaction_model",
        method: "create",
        body: {
            name: "engine_off",
            label: "Engine Off",
            control: async function (player, entity) {
                return true //todo
            },
            job: async function (player, entity) {
                ctx.run({
                    token: true,
                    method: "update",
                    model: entity.entity_type,
                    query: { pk: entity.fookieId },
                    body: {
                        ragemp_engine: false,
                    }
                })
            },
        }
    })
}


mp.events.addCommand("veh_engine", (player) => {
    player.vehicle.ragemp_engine = true
})


mp.events.add("interaction_menu_do", async function (player, entity, event) {
    let res = await payload.ctx.run({
        token: true,
        method: "read",
        model: "interaction_menu",
        query: {
            name: event
        }
    })
    let interaction_menu = res.data[0]

    res = await payload.ctx.run({
        token: true,
        method: "read",
        model: "character",
        query: {
            pk: player.getVariable("fookieId")
        }
    })
    let character = res.data[0]
    if (await interaction_menu.control(character, entity)) {
        await interaction_menu.job(character, entity)
    }
})