module.exports = async function (payload) {
    if (payload.model.schema.hasOwnProperty("position") && typeof payload.user.position == "object") {
        payload.body.position = payload.user.position
    } else {
        payload.response.errors.push("doesnt have player position")
    }

}