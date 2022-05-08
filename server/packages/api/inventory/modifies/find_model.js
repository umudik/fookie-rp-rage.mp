module.exports = async function (payload) {
    //1 envanteri bul
    //2 envanterin takılı olduğu şeyi bul.
    //3

    let target_inv_id = null
    if (payload.method == "create") {
        target_inv_id = payload.body.inventory
    } else {
        let res = await payload.api.run({
            token: true,
            model: "inventory",
            method: "get",
            query: { filter: { id: target_inv_id } }
        })
        let inventory = res.data

        res = await payload.api.run({
            token: true,
            model: "entity_type",
            method: "get",
            query: { filter: { id: inventory_type.entity_type } }
        })
        let entity_type = res.data
        let modelName = entity_type.model


        res = await payload.api.run({
            token: true,
            model: modelName,
            method: "get",
            query: { filter: { field: inventory._id } }
        })

        let model = res.data

        return model



    }
}