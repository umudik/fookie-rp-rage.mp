module.exports = async function (payload) {
    console.log(payload.user);
    if (payload.model.schema.hasOwnProperty("position") && payload.player.hasOwnProperty("position")) {
        console.log(payload.body.position);
        console.log(1111113);
        payload.body.position = payload.user.position
    } else {
        payload.response.errors.push("doesnt have player position")
    }

}