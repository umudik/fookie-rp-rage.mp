module.exports = {
    name: 'phone',
    display: "_id",
    schema: {
        type: {
            relation: "item",
        },
        bg_image: {
            type: "string",
            input: "text"
        },
        ringtone: {
            type: "string",
            input: "text"
        },
        zoom: {
            type: "number",
            input: "range",
            min: 0,
            max: 100
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