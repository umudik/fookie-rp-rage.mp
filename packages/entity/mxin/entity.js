module.exports = {
    schema: {
        dimension: {
            type: "number",
            input: "number"
        },
        position: {
            required: true,
            type: "object",
            input: "json",
        },
        heading: {
            type: "object",
            input: "json",
        }
    },
}