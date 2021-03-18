module.exports = {
    name: 'Player',
    schema: {
        email: {},
        name: {
            type: "STRING",
            unique: true,
            input: "text",
            read: [],
            write: []
        },
    },
    fookie: {
        post: {
            notify: ['everybody'],
            auth: ['everybody'],
            requirement: [],
            effect: ["notify"]
        },
        delete: {
            notify: [],
            auth: ['everybody'],
            requirement: [],
            effect: []
        },
    }
}