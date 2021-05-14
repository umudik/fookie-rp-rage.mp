module.exports = {
    name: 'item',
    display: "id",
    schema: {
        item_type: {       
            relation: "item_type",
        },
        inventory: {          
            relation: "inventory",
        },
        amount: {
            type: "string",
            input: "text",
        },
        data: {
            type: "jsonb",
            input: "json",
        },
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