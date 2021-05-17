/*



5	Frame
6	Grille
7	Hood
8	Fender
9	Right Fender
10	Roof
11	Engine
12	Brakes
13	Transmission
14  Horns
15	Suspension
16	Armor

18	Turbo
22	Xenon
23	Front Wheels

24 (Only for Motorcycles)	Back Wheels
25	Plate holders
27	Trim Design

28	Ornaments
30	Dial Design

33	Steering Wheel
34	Shift Lever
35	Plaques

38	Hydraulics
40	Boost


55	Window Tint
48	Livery
53	Plate

*/


let properties = [
    { key: "spoiler", modType: 0, },
    { key: "frontBumper", modType: 1, },
    { key: "rearBumper", modType: 2, },
    { key: "sideSkirt", modType: 3, },
    { key: "exhaust", modType: 4, },
    { key: "Frame", modType: 5, },
    { key: "Grille", modType: 6, },
    { key: "Hood", modType: 7, },
    { key: "Fender", modType: 8, },
    { key: "Right Fender", modType: 9, },
    { key: "Roof", modType: 10, },
    { key: "Engine", modType: 11, },
    { key: "Brakes", modType: 12, },
    { key: "Transmission", modType: 13, },
    { key: "Horns", modType: 14, },
    { key: "Suspension", modType: 15, },
    { key: "Armor", modType: 16, },
    { key: "Turbo", modType: 18, },
    { key: "Xenon", modType: 22, },
    { key: "Front Wheels", modType: 23, },
    { key: "Back Wheels", modType: 24, },
    { key: "Back Wheels", modType: 25, },
    { key: "Plate holders", modType: 25, },
    { key: "Trim Design", modType: 27, },
    { key: "Ornaments", modType: 38, },
    { key: "Dial Design", modType: 30, },
    { key: "Steering Wheel", modType: 33, },
    { key: "Shift Lever", modType: 34, },
    { key: "Plaques", modType: 35, },
    { key: "Plaques", modType: 36, },
    { key: "Plaques", modType: 37, },
    { key: "Plaques", modType: 38, },
    { key: "Plaques", modType: 39, },
    { key: "Hydraulics", modType: 40, },
    { key: "Hydraulics", modType: 41, },
    { key: "Hydraulics", modType: 42, },
    { key: "Hydraulics", modType: 43, },
    { key: "Hydraulics", modType: 44, },
    { key: "Hydraulics", modType: 45, },
    { key: "Hydraulics", modType: 46, },
    { key: "Hydraulics", modType: 47, },
    { key: "Hydraulics", modType: 48, },
    { key: "Hydraulics", modType: 49, },
    { key: "Hydraulics", modType: 50, },
    { key: "Hydraulics", modType: 51, },
    { key: "Hydraulics", modType: 52, },
    { key: "plate", modType: 53, },
    { key: "Hydraulics", modType: 54, },
    { key: "tint", modType: 55, },
    { key: "color1", modType: 66, },
    { key: "color2", modType: 67, },
]
for (let p of properties) {
    mp.Vehicle.prototype["_" + p.key] = null
    Object.defineProperty(mp.Vehicle, p.key, {
        get() {
            return this["_" + p.key]
        },
        set(modIndex) {
            this["_" + p.key] = modIndex
            this.setMod(p.modType, modIndex)
        }
    })

}