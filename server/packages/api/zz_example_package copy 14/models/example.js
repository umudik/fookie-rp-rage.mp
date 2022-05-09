module.exports = {
    name: 'example',
    schema: {
        type: {
            relation: "example",
        },
    },
    database: "mongodb",
    lifecycle: {

        read: {
            role: ["everybody"],
        },
        update: {
            role: ["system"],
        },
        create: {
            role: ["system"],
        },
        delete: {
            role: ["system"],
        },

    }
}