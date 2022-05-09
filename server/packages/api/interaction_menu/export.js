module.exports = async function (ctx) {
    await ctx.use(require("./models/interaction_menu.js"))
    await ctx.use(require("./menus/index.js"))
}


mp.events.add("fookie_connected", async (ctx) => {
    mp.events.addCommand("veh_engine", (player) => {
        player.vehicle.ragemp_engine = true
    })


    mp.events.add("interaction_menu_do", async function (player, raw_payload) {
        const payload = JSON.parse(raw_payload)

        let im_res = await ctx.run({
            token: true,
            model: "interaction_menu",
            method: "read",
            query: {
                filter: {
                    id: payload.interaction_menu
                }
            }
        })

        const interaction_menu = im_res.data[0]

        const c_res = await ctx.run({
            token: true,
            method: "read",
            model: "character",
            query: {
                pk: player.getVariable("fookie_id")
            }
        })
        const character = c_res.data[0]

        const e_res = await ctx.run({
            token: true,
            method: "read",
            model: payload.entity_type,
            query: {
                filter: {
                    pk: payload.fookie_id
                }

            }
        })
        const entity = e_res.data[0]

        if (await interaction_menu.control(player, entity, payload)) {
            await interaction_menu.job(player, entity, payload)
        }
    })
})
