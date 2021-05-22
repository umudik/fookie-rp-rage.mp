module.exports = async function (payload) {
    //1 envanteri bul
    //2 envanterin takılı olduğu şeyi bul.
    //3

    let target_inv_id = null
    if (payload.method == "post") {
        target_inv_id = payload.body.inventory
    } else {
        let res = await payload.api.run({
            user: { system: true },
            model: "inventory",
            method: "get",
            query: { where: { id: target_inv_id } }
        })
        let inventory = res.data

        res = await payload.api.run({
            user: { system: true },
            model: "entity_type",
            method: "get",
            query: { where: { id: inventory_type.entity_type } }
        })
        let entity_type = res.data
        let modelName = entity_type.model


        res = await payload.api.run({
            user: { system: true },
            model: modelName,
            method: "get",
            query: { where: { field: inventory._id } }
        })

        let model = res.data

        return model



    }
}