

mp.events.add('fookie_connected', () => {
    mp.api.model(require("./models/shop.js"))
    mp.api.model(require("./models/shop_type.js"))
    mp.api.model(require("./models/shop_prices.js"))
})