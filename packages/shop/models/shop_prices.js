module.exports = {
    name: 'shop_prices',
    display: "_id",
    schema: {
        shop: {
            required:true,
            relation: "shop"
        },
        price: {
            type:"number",
            input: "number"
        },
        item: {
            relation: "item"
        }
    },
    database:"mongodb",lifecycle: {
        get: {
            role: ["everybody"],
        },
        getAll: {
            role: ["everybody"],
        },
        patch: {
            role: ["admin"],
        },
        post: {
            role: ["admin"],
        },
        delete: {
            role: ["admin"],
        },
        schema: {
            role: ["everybody"],
        }
    }
}