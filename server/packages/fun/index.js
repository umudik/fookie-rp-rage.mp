
mp.events.add("playerDeath", (player) => {
    player.spawn()
})
mp.events.add("s", (player) => {
    player.spawn()
})


mp.events.addCommand("spawn", async (player) => {
    player.spawn(new mp.Vector3(0, 0, 72.5))
    player.dimension = 0
})

mp.events.addCommand('marker', async (player) => {
    let res = await mp.fookie.run({
        token: true,
        model: "marker",
        method: "create",
        body: {
            joaat: Math.round(Math.random() * 43) + 1,
            color: [0, 123, 123, 255],
            position: {
                x: player.position.x,
                y: player.position.y,
                z: player.position.z
            },
            parent_id: "-",
            dimension: player.dimension,
        }
    })
})

mp.events.addCommand('blip', async (player) => {
    let res = await mp.fookie.run({
        token: true,
        model: "blip",
        method: "create",
        body: {
            parent_id: "-",
            joaat: Math.round(Math.random() * 43) + 1,
            color: 13,
            position: player.position,
            dimension: player.dimension,
        }
    })
})

mp.events.addCommand('colshape', async (player) => {
    let res = await mp.fookie.run({
        token: true,
        model: "colshape",
        method: "create",
        body: {
            joaat: 40,
            type: "circle",
            position: player.position,
            dimension: player.dimension,
        }
    })
})

mp.events.addCommand('label', async (player) => {
    let res = await mp.fookie.run({
        token: true,
        model: "label",
        method: "create",

        body: {
            text: "EXAMPLE TEXT " + Math.round(Math.random() * 100),
            position: player.position,
            dimension: player.dimension,
        }
    })
})

mp.events.addCommand('checkpoint', async (player) => {
    let res = await mp.fookie.run({
        token: true,
        model: "checkpoint",
        method: "create",
        body: {
            joaat: 1,
            position: player.position,
            dimension: player.dimension,
        }
    })
})


mp.events.add("playerEnterColshape", (player, shape) => {
    console.log("BİR COLSHAPE GİRİLDİ-------");
    console.log(shape);
    console.log("------------------------");
});

mp.events.addCommand('apart', async (player) => {
    let res = await mp.fookie.run({
        token: true,
        model: "apartment",
        method: "create",
        body: {
            name: "apartmanet " + Math.round(Math.random() * 99100),
            type: await mp.fookie.remote.random("apartment_type"),
            position: player.position,
            fixed_dimension: Math.round(Math.random() * 999991434),
        }
    })
})







mp.events.addCommand('randomize', async (player) => {
    const _id = player.getVariable("fookie_id");
    if (_id) {
        await mp.fookie.remote.update("player", _id, {
            "customization_gender": Math.random() > 0.5 ? false : true,
        })

        await mp.fookie.remote.update("player", _id, {
            "customization_gender": Math.random() > 0.5 ? false : true,
            "customization_mother_blend": Math.random(),
            "customization_father_blend": Math.random(),
            "customization_f_blend_shape": Math.random(),
            "customization_f_blend_skin": Math.random(),
            "customization_hair_highlight": Math.random(),
            "customization_hair_color": Math.round(Math.random() * 255),
            "customization_nose_width": Math.random(),
            "customization_nose_height": Math.random(),
            "customization_nose_length": Math.random(),
            "customization_nose_bridge": Math.random(),
            "customization_nose_tip": Math.random(),
            "customization_nose_bridge_shift": Math.random(),
            "customization_brow_height": Math.random(),
            "customization_brow_width": Math.random(),
            "customization_c_bone_height": Math.random(),
            "customization_c_bone_width": Math.random(),
            "customization_cheek_width": Math.random(),
            "customization_eyes": Math.random(),
            "customization_lips": Math.random(),
            "customization_jaw_width": Math.random(),
            "customization_jaw_height": Math.random(),
            "customization_chin_length": Math.random(),
            "customization_chin_pos": Math.random(),
            "customization_chin_width": Math.random(),
            "customization_chin_shape": Math.random(),
            "customization_neck_width": Math.random()
        })
    }

})



