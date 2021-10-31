module.exports = {
    name: 'account',
    display: "_id",
    schema: {
        email: {
            type: "string",
            type: "text"
        },
        password: {
            type: "string",
            type: "password"
        },
        image: {
            type: "string",
            type: "text"
        }
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