module.exports = async (ctx) => {
    //-----------------VEHİCLE---------------------
    await ctx.run({
        token: process.env.SYSTEM_TOKEN,
        model: "interaction_menu",
        method: "create",
        body: {
            name: "engine_on",
            label: "Engine On",
            tag: "vehicle",
            close_on_click: true,
            control: async function (character, payload, im) {
                return true //todo
            },
            job: async function (character, payload, im) {
                let res = await ctx.remote.update("vehicle", payload.fookie_id, { ragemp_engine: true })
            },
        }
    })

    await ctx.run({
        token: process.env.SYSTEM_TOKEN,
        model: "interaction_menu",
        method: "create",
        body: {
            name: "engine_off",
            label: "Engine Off",
            tag: "vehicle",
            close_on_click: true,
            control: async function (character, payload, im) {
                return true //todo
            },
            job: async function (character, payload, im) {
                let res = await ctx.remote.update("vehicle", payload.fookie_id, { ragemp_engine: false })
            },
        }
    })


    await ctx.run({
        token: process.env.SYSTEM_TOKEN,
        model: "interaction_menu",
        method: "create",
        body: {
            name: "vehicle_destroy",
            label: "Delete Vehicle",
            tag: "vehicle",
            close_on_click: true,
            control: async function (character, payload, im) {
                return true //todo
            },
            job: async function (character, payload, im) {
                let res = await ctx.remote.delete("vehicle", payload.fookie_id)
            },
        }
    })
}
