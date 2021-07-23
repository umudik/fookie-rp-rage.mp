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
    database:"mongodb",lifecycle: {
        get: {
            role: ["everybody"],
        },
        getAll: {
            role: ["everybody"],
        },
        patch: {
            role: ["admin"],
        },
        post: {
            role: ["admin"],
        },
        delete: {
            role: ["admin"],
        },
        schema: {
            role: ["everybody"],
        }
    }
}