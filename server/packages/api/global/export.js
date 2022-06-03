module.exports = async function (ctx) {
    await ctx.use(require("./rule/set_computed_data.js"))

    mp.events.addProc("CEF_URL", async (player) => {
        return process.env.CEF
    })
    mp.events.addProc("API_URL", async (player) => {
        return process.env.API
    })
}