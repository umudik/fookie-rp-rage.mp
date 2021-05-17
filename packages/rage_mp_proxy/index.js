
//-------------------VEHİCLE MODIFY------------------------

let properties = [
    { key: "mod_spoiler", modType: 0, min: 0, max: 0 },// OK
    { key: "mod_front_bumper", modType: 1, min: 0, max: 0 },// OK
    { key: "mod_rear_bumper", modType: 2, min: 0, max: 0 },// OK
    { key: "mod_side_skirt", modType: 3, min: 0, max: 0 },// OK
    { key: "mod_exhaust", modType: 4, min: 0, max: 0 },// OK
    { key: "mod_frame", modType: 5, min: 0, max: 0 },// OK
    { key: "mod_grille", modType: 6, min: 0, max: 0 },// OK
    { key: "mod_hood", modType: 7, min: 0, max: 0 },// OK
    { key: "mod_fender", modType: 8, min: 0, max: 0 },// OK
    { key: "mod_right_fender", modType: 9, min: 0, max: 0 },// OK
    { key: "mod_roof", modType: 10, min: 0, max: 0 },// OK
    { key: "mod_engine", mod min: 0, max: 0 },// OK
    { key: "mod_brake", modType: 12, min: 0, max: 0 },// OK
    { key: "mod_transmission", modType: 13, min: 0, max: 0 },// OK
    { key: "mod_horn", modType: 14, min: 0, max: 0 },// OK
    { key: "mod_suspension", modType: 15, min: 0, max: 0 },// OK
    { key: "mod_armor", modType: 16, min: 0, max: 0 },// OK
    { key: "mod_turbo", modType: 18, min: 0, max: 0 },// OK
    { key: "mod_xenon", modType: 22, min: 0, max: 0 },// OK
    { key: "mod_front_wheels", modType: 23, min: 0, max: 0 },// OK
    { key: "mod_back_wheels", modType: 24, min: 0, max: 0 },// OK
    { key: "mod_plate_holder", modType: 25, min: 0, max: 0 },// OK
    { key: "mod_vanity_plates", modType: 26, min: 0, max: 0 },// OK
    { key: "mod_trim_design", modType: 27, min: 0, max: 0 },// OK
    { key: "mod_ornaments", modType: 28, min: 0, max: 0 },// OK
    { key: "mod_dial_design", modType: 30, min: 0, max: 0 },// OK
    { key: "mod_steering_wheel", modType: 33, min: 0, max: 0 },// OK
    { key: "mod_shift_lever", modType: 34, min: 0, max: 0 },// OK
    { key: "mod_plaques", modType: 35, min: 0, max: 0 },// OK
    { key: "mod_speakers", modType: 36, min: 0, max: 0 },// OK
    { key: "mod_trunk", modType: 37, min: 0, max: 0 },// OK
    { key: "mod_hydraulics", modType: 38, min: 0, max: 0 },// OK
    { key: "mod_engine_block", modType: 39, min: 0, max: 0 },// OK
    { key: "mod_boost", modType: 40, min: 0, max: 0 },// OK AIR FILTER OR BOOST
    { key: "mod_struts", modType: 41, min: 0, max: 0 },// OK
    { key: "mod_arch_cover", modType: 42, min: 0, max: 0 },// OK
    { key: "mod_aerials", modType: 43, min: 0, max: 0 },// OK
    { key: "mod_trim", modType: 44, min: 0, max: 0 },// OK
    { key: "mod_tank", modType: 45, min: 0, max: 0 },// OK
    { key: "mod_windows", modType: 46, min: 0, max: 0 },// OK
    { key: "mod_unknown", modType: 47, min: 0, max: 0 },// OK
    { key: "mod_livery", modType: 48, min: 0, max: 0 },// OK
    { key: "mod_plate", modType: 53, min: 0, max: 0 },// OK
    { key: "mod_window_tint", modType: 55, min: 0, max: 0 },// OK
]


for (let p of properties) {
    mp.Vehicle.prototype["_" + p.key] = null
    console.log("vehicle", " | ", p.key);
    Object.defineProperty(mp.Vehicle.prototype, p.key, {
        get() {
            return this["_" + p.key]
        },
        set(modIndex) {
            this["_" + p.key] = modIndex
            this.setMod(p.modType, modIndex)
        }
    })
}






//-------------------VEHİCLE COLOR------------------------

mp.Vehicle.prototype["_color1"] = [0, 0, 0]
console.log("vehicle", " | ", "colo1r");
Object.defineProperty(mp.Vehicle.prototype, "color1", {
    get() {
        return this["_color1"]
    },
    set(modIndex) {
        this["_color1"] = modIndex
        this.setColorRGB(...this["_color1"], ...this["_color2"]);
    }
})


mp.Vehicle.prototype["_color2"] = [0, 0, 0]
console.log("vehicle", " | ", "color2");
Object.defineProperty(mp.Vehicle.prototype, "color2", {
    get() {
        return this["_color2"]
    },
    set(modIndex) {
        this["_color2"] = modIndex
        this.setColorRGB(...this["_color1"], ...this["_color2"]);
    }
})




mp.events.addCommand("veh_color", (player) => {
    if (player.vehicle) {
        player.vehicle.color2 = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
        player.vehicle.color1 = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
    }
})








// ------------------------------------- PLAYER -----------------------------------------


//------------------Clothes-----------------
/*
0 - Head
1 - Beard
2 - Hair
3 - Torso
4 - Legs
5 - Hands
6 - Foot
7 - Eyes
8 - Accessories like parachute, scuba tank
9 - Accessories like bags, mask, scuba mask
10- Decals and mask
11 - Auxiliary parts for torso

*/

let player_props = [
    { key: "head", type: 0, min: 0, max: 255 },
    { key: "beard", type: 1, min: 0, max: 255 },
    { key: "hair", type: 2, min: 0, max: 255 },
    { key: "torso", type: 3, min: 0, max: 255 },
    { key: "legs", type: 4, min: 0, max: 255 },
    { key: "hand", type: 5, min: 0, max: 255 },
    { key: "foot", type: 6, min: 0, max: 255 },
    { key: "eye", type: 7, min: 0, max: 255 },
    { key: "Accessory1", type: 8, min: 0, max: 255 },
    { key: "Accessory2", type: 9, min: 0, max: 255 },
    { key: "decal", type: 10, min: 0, max: 255 },
    { key: "auxiliary ", min: 0, max: 255 },
]

for (let p of player_props) {

    mp.Player.prototype["_" + p.key] = null
    console.log("player", " | ", p.key);
    Object.defineProperty(mp.Player.prototype, p.key, {
        get() {
            return this["_" + p.key]
        },
        set({ drawable, texture }) {
            this["_" + p.key] = { drawable, texture }
            this.setClothes(p.type, drawable, texture, 2)
        }
    })
}

//--------------------Customization-----------------
let player_customs = [
    { key: "gender", type: 0, min: 0, max: 255 },
    { key: "mother_blend", min: 0, max: 255 },
    { key: "father_blend", min: 0, max: 255 },
    { key: "f_blend_shape", min: 0, max: 255 },
    { key: "f_blend_skin", min: 0, max: 255 },
    { key: "hair_highlight", min: 0, max: 255 },
    { key: "hair_color", min: 0, max: 255 },
    { key: "nose_width", min: 0, max: 255 },
    { key: "nose_height", min: 0, max: 255 },
    { key: "nose_length", min: 0, max: 255 },
    { key: "nose_bridge", min: 0, max: 255 },
    { key: "nose_tip", min: 0, max: 255 },
    { key: "nose_bridge_shift", min: 0, max: 255 },
    { key: "brow_height", min: 0, max: 255 },
    { key: "brow_width", min: 0, max: 255 },
    { key: "c_bone_height", min: 0, max: 255 },
    { key: "c_bone_width", min: 0, max: 255 },
    { key: "cheek_width", min: 0, max: 255 },
    { key: "eyes", min: 0, max: 255 },
    { key: "lips", min: 0, max: 255 },
    { key: "jaw_width", min: 0, max: 255 },
    { key: "jaw_height", min: 0, max: 255 },
    { key: "chin_length", min: 0, max: 255 },
    { key: "chin_pos", min: 0, max: 255 },
    { key: "chin_width", min: 0, max: 255 },
    { key: "chin_shape", min: 0, max: 255 },
    { key: "neck_width", min: 0, max: 255 },
]

for (let p of player_customs) {

    mp.Player.prototype["_" + p.key] = null
    console.log("player", " | ", p.key);
    Object.defineProperty(mp.Player.prototype, p.key, {
        get() {
            return this["_" + p.key]
        },
        set({ drawable, texture }) {
            this["_" + p.key] = { drawable, texture }
            this.setCustomization(
                this["_gender"],
                this["_mother_blend"],
                this["_father_blend"],
                0,
                this["_mother_blend"],
                this["_father_blend"],
                0,
                this["_f_blend_shape"],
                this["_f_blend_skin"],
                0,
                1,
                this["_hair_color"],
                this["_hair_highlight"],
                [
                    this["_nose_width"],
                    this["_nose_height"],
                    this["_nose_length"],
                    this["_nose_bridge"],
                    this["_nose_tip"],
                    this["_nose_bridge_shift"],
                    this["_brow_height"],
                    this["_brow_width"],
                    this["_c_bone_height"],
                    this["_c_bone_width"],
                    this["_cheek_width"],
                    this["_eyes"],
                    this["_lips"],
                    this["_jaw_width"],
                    this["_jaw_height"],
                    this["_chin_length"],
                    this["_chin_pos"],
                    this["_chin_width"],
                    this["_chin_shape"],
                    this["_neck_width"]
                ]
            );
        }
    })
}

//------------------Clothes-----------------
//------------------Clothes-----------------
//------------------Clothes-----------------
//------------------Clothes-----------------
