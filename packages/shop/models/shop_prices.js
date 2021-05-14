module.exports = {
    name: 'shop_prices',
    display: "id",
    schema: {
        shop: {
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
            auth: ["everybody"],
        },
        getAll: {
            auth: ["everybody"],
        },
        patch: {
            auth: ["system_admin"],
        },
        post: {
            auth: ["system_admin"],
        },
        delete: {
            auth: ["system_admin"],
        },
        schema: {
            auth: ["everybody"],
        }
    }
}