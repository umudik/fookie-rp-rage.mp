module.exports = async function (payload) {
    if (typeof payload.model.schema.position == "object" && typeof payload.user.position == "object") {
        payload.body.position = payload.user.position
    } else {
        payload.response.errors.push("doesnt have player position")
    }

}