module.exports = async function (payload) {
    /*
    console.log("check_Weight");
    let inv_id = null
    if (payload.method == "post") {
        inv_id = payload.body.inventory
    } else if (payload.method == "patch") {
        inv_id = payload.target.inventory
    }

    //find items in same inv.
    let items = await payload.ctx.run({
        user: { system: true },
        method: "getAll",
        model: "item",
        query: {
            where: {
                id: inv_id
            }
        }
    })
    */
    return true
}