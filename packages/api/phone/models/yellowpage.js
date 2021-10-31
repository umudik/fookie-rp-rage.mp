module.exports = {
    name: 'yellowpages',
    display: "_id",
    schema: {
        account: {
            relation: "account",
        },
        title: {
            type: "string",
            input: "text"
        },
        content: {
            type: "string",
            input: "text"
        },
        image: {
            type: "string",
            input: "text"
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