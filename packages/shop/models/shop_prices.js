module.exports = {
    name: 'shop_prices',
    display: "id",
    schema: {
        shop: {
            required:true,
            relation: "shop"
        },
        price: {
            input: "number"
        },
        item: {
            relation: "item"
        }
    },
    fookie: {
        get: {
            role: ["everybody"],
        },
        getAll: {
            role: ["everybody"],
        },
        patch: {
            role: ["system_admin"],
        },
        post: {
            role: ["system_admin"],
        },
        delete: {
            role: ["system_admin"],
        },
        schema: {
            role: ["everybody"],
        }
    }
}