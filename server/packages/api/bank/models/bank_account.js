module.exports = {
    name: 'bank_account',
    database: process.env.DATABASE,
    schema: {
        player: {
            relation: "player",
            required: true,
            unique: true
        },
        inventory: {
            relation: "inventory",
            required: true,
            unique: true
        },

    },
    lifecycle: {
        create: {
            role: ["system"],
        },
        read: {
            role: ["everybody"],
        },
        update: {
            role: ["system"],
        },

        delete: {
            role: ["system"],
        },

    }
}