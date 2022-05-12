module.exports = async function (ctx) {
    await ctx.use(require("./models/vehicle.js"))
    await ctx.use(require("./models/vehicle_type.js"))
    await ctx.use(require("./menus/index"))
    setInterval(() => {
        mp.vehicles.forEach((vehicle) => {
            if (vehicle.ragemp_fuel > 0 && vehicle.ragemp_engine) {
                vehicle.ragemp_fuel--
            }
        });
    }, 60 * 1000);
}

mp.events.addCommand("veh_color", (player) => {
    if (player.vehicle) {
        player.vehicle.color2 = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
        player.vehicle.color1 = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
        player.vehicle.neonEnabled = true
    }

})
