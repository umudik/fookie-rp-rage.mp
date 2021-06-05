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