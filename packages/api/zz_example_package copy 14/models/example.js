module.exports = {
    name: 'example',
    display: "_id",
    schema: {
        type: {
            relation: "example",
        },
    },
    database: "store",
    lifecycle: {

        read: {
            role: ["everybody"],
        },
        update: {
            role: ["admin"],
        },
        create: {
            role: ["admin"],
        },
        delete: {
            role: ["admin"],
        },

    }
}