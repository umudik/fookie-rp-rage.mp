


// FOR WHAT ???
// usage -> vehicle.mod_horn = 3 // works well 
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
    { key: "mod_engine", modType: 11, min: 0, max: 0 },// OK
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
    { key: "mod_vanity_plate", modType: 26, min: 0, max: 0 },// OK
    { key: "mod_trim_design", modType: 27, min: 0, max: 0 },// OK
    { key: "mod_ornament", modType: 28, min: 0, max: 0 },// OK
    { key: "mod_dial_design", modType: 30, min: 0, max: 0 },// OK
    { key: "mod_steering_wheel", modType: 33, min: 0, max: 0 },// OK
    { key: "mod_shift_lever", modType: 34, min: 0, max: 0 },// OK
    { key: "mod_plaques", modType: 35, min: 0, max: 0 },// OK
    { key: "mod_speakers", modType: 36, min: 0, max: 0 },// OK
    { key: "mod_trunk", modType: 37, min: 0, max: 0 },// OK
    { key: "mod_hydraulic", modType: 38, min: 0, max: 0 },// OK
    { key: "mod_engine_block", modType: 39, min: 0, max: 0 },// OK
    { key: "mod_boost", modType: 40, min: 0, max: 0 },// OK AIR FILTER OR BOOST
    { key: "mod_struts", modType: 41, min: 0, max: 0 },// OK
    { key: "mod_arch_cover", modType: 42, min: 0, max: 0 },// OK
    { key: "mod_aerial", modType: 43, min: 0, max: 0 },// OK
    { key: "mod_trim", modType: 44, min: 0, max: 0 },// OK
    { key: "mod_tank", modType: 45, min: 0, max: 0 },// OK
    { key: "mod_windows", modType: 46, min: 0, max: 0 },// OK
    { key: "mod_unknown", modType: 47, min: 0, max: 0 },// OK
    { key: "mod_livery", modType: 48, min: 0, max: 0 },// OK
    { key: "mod_plate", modType: 53, min: 0, max: 0 },// OK
    { key: "mod_window_tint", modType: 55, min: 0, max: 0 },// OK
]


for (let p of properties) {
    mp.Vehicle.prototype["_" + p.key] = -1
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


mp.Vehicle.prototype["_color1"] = [0, 0, 0]
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
Object.defineProperty(mp.Vehicle.prototype, "color2", {
    get() {
        return this["_color2"]
    },
    set(modIndex) {
        this["_color2"] = modIndex
        this.setColorRGB(...this["_color1"], ...this["_color2"]);
    }
})



mp.Vehicle.prototype["_ragemp_engine"] = false
Object.defineProperty(mp.Vehicle.prototype, "ragemp_engine", {
    get() {
        return this["_ragemp_engine"]
    },
    set(modIndex) {
        if (this.ragemp_fuel == 0) {
            this["_ragemp_engine"] = false
            this.engine = false
        } else {
            this["_ragemp_engine"] = modIndex
            this.engine = modIndex
        }

    }
})

mp.Vehicle.prototype["_ragemp_fuel"] = 100
Object.defineProperty(mp.Vehicle.prototype, "ragemp_fuel", {
    get() {
        return this["_ragemp_fuel"]
    },
    set(modIndex) {
        if (modIndex == 0) { this.ragemp_engine = false }
        this["_ragemp_fuel"] = modIndex
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
    { key: "cloth_head", type: 0, min: 0, max: 255 },
    { key: "cloth_beard", type: 1, min: 0, max: 255 },
    { key: "cloth_hair", type: 2, min: 0, max: 255 },
    { key: "cloth_torso", type: 3, min: 0, max: 255 },
    { key: "cloth_legs", type: 4, min: 0, max: 255 },
    { key: "cloth_hand", type: 5, min: 0, max: 255 },
    { key: "cloth_foot", type: 6, min: 0, max: 255 },
    { key: "cloth_eye", type: 7, min: 0, max: 255 },
    { key: "cloth_accessory1", type: 8, min: 0, max: 255 },
    { key: "acloth_accessory2", type: 9, min: 0, max: 255 },
    { key: "cloth_decal", type: 10, min: 0, max: 255 },
    { key: "cloth_auxiliary ", type: 11, min: 0, max: 255 },
]

for (let p of player_props) {
    mp.Player.prototype["_" + p.key] = null
    Object.defineProperty(mp.Player.prototype, p.key, {
        get() {
            return this["_" + p.key]
        },
        set(object) {
            this["_" + p.key] = object.drawable
            this.setClothes(p.type, object.drawable, object.texture, 2)
        }
    })
}

//--------------------Customization-----------------
let player_customs = [
    { key: "customization_gender", min: 0, max: 1 },
    { key: "customization_mother_blend", min: 0, max: 255 },
    { key: "customization_father_blend", min: 0, max: 255 },
    { key: "customization_f_blend_shape", min: 0, max: 255 },
    { key: "customization_f_blend_skin", min: 0, max: 255 },
    { key: "customization_hair_highlight", min: 0, max: 255 },
    { key: "customization_hair_color", min: 0, max: 255 },
    { key: "customization_nose_width", min: 0, max: 255 },
    { key: "customization_nose_height", min: 0, max: 255 },
    { key: "customization_nose_length", min: 0, max: 255 },
    { key: "customization_nose_bridge", min: 0, max: 255 },
    { key: "customization_nose_tip", min: 0, max: 255 },
    { key: "customization_nose_bridge_shift", min: 0, max: 255 },
    { key: "customization_brow_height", min: 0, max: 255 },
    { key: "customization_brow_width", min: 0, max: 255 },
    { key: "customization_c_bone_height", min: 0, max: 255 },
    { key: "customization_c_bone_width", min: 0, max: 255 },
    { key: "customization_cheek_width", min: 0, max: 255 },
    { key: "customization_eyes", min: 0, max: 255 },
    { key: "customization_lips", min: 0, max: 255 },
    { key: "customization_jaw_width", min: 0, max: 255 },
    { key: "customization_jaw_height", min: 0, max: 255 },
    { key: "customization_chin_length", min: 0, max: 255 },
    { key: "customization_chin_pos", min: 0, max: 255 },
    { key: "customization_chin_width", min: 0, max: 255 },
    { key: "customization_chin_shape", min: 0, max: 255 },
    { key: "customization_neck_width", min: 0, max: 255 },
]

for (let p of player_customs) {
    mp.Player.prototype["_" + p.key] = 0
    Object.defineProperty(mp.Player.prototype, p.key, {
        get() {
            return this["_" + p.key]
        },
        set(number) {
            this["_" + p.key] = number
            this.setCustomization(
                this["_customization_gender"],
                this["_customization_mother_blend"],
                this["_customization_father_blend"],
                0,
                this["_customization_mother_blend"],
                this["_customization_father_blend"],
                0,
                this["_customization_f_blend_shape"],
                this["_customization_f_blend_skin"],
                0,
                1,
                this["_customization_hair_color"],
                this["_customization_hair_highlight"],
                [
                    this["_customization_nose_width"],
                    this["_customization_nose_height"],
                    this["_customization_nose_length"],
                    this["_customization_nose_bridge"],
                    this["_customization_nose_tip"],
                    this["_customization_nose_bridge_shift"],
                    this["_customization_brow_height"],
                    this["_customization_brow_width"],
                    this["_customization_c_bone_height"],
                    this["_customization_c_bone_width"],
                    this["_customization_cheek_width"],
                    this["_customization_eyes"],
                    this["_customization_lips"],
                    this["_customization_jaw_width"],
                    this["_customization_jaw_height"],
                    this["_customization_chin_length"],
                    this["_customization_chin_pos"],
                    this["_customization_chin_width"],
                    this["_customization_chin_shape"],
                    this["_customization_neck_width"]
                ]
            );
        }
    })
}

//------------------TATTOOS-----------------

