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