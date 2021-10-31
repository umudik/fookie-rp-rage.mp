
module.exports = async function (ctx) {
    ctx.use(require("./models/shop.js"))
    ctx.use(require("./models/shop_type.js"))
    ctx.use(require("./models/shop_item_price.js"))
}