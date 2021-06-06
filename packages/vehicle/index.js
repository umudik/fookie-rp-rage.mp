mp.events.add('fookie_connected', async () => {
    await mp.api.model(require("./models/vehicle.js"))
    await mp.api.model(require("./models/vehicle_type.js"))

    mp.api.routine("vehicle_fuel", 30 * 1000, async function (ctx) {
        mp.vehicles.forEach((vehicle) => {
            let fuel = vehicle.getVariable("fuel")
            if (fuel > 0) {
                fuel--
                vehicle.setVariable("fuel", fuel)
            }
        });
    })
})


mp.events.addCommand("veh_color", (player) => {
    if (player.vehicle) {
        player.vehicle.color2 = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
        player.vehicle.color1 = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
        player.vehicle.neonEnabled = true
    }
   
})
