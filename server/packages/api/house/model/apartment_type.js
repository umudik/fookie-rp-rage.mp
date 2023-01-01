module.exports = async function (ctx) {
    await ctx.model({
        name: 'apartment_type',
        database: process.env.DATABASE,
        mixin: ["cache"],
        schema: {
            name: {
                type: "string",
                required: true,
                unique: true,
            },
            code: {
                type: "string",
                required: true,
            },
            flat_size: {
                type: "number",
                required: true,
            },
            location: {
                type: "object",
                required: true,
            }
        },
        lifecycle: {
            create: {
                role: ["system"],
            },
            read: {
                role: ["everybody"],
            },
            update: {
                role: ["system"],
                filter: ["set_computed_data"],
                effect: ["apartment_type_door"]
            },
            delete: {
                role: ["system"],
            },
        }
    })

    const array = [
        {
            name: "Model 1 Apartment",
            code: "apa_v_mp_h_01_a",
            location: {
                x: -786.8663,
                y: 315.7642,
                z: 218.0385
            },
            flat_size: 5
        },
        {
            name: "Model 2 Apartment",
            code: "apa_v_mp_h_01_c",
            location: {
                x: -786.8663,
                y: 315.6229,
                z: 188.4136
            },
            flat_size: 5
        },
        {
            name: "Modern 3 Apartment",
            code: "apa_v_mp_h_01_b",
            location: {
                x: -774.0126,
                y: 342.0428,
                z: 197.0
            },
            flat_size: 5
        },
        {
            name: "Mody 1 Apartment",
            code: "apa_v_mp_h_02_a",
            location: {
                x: - 787.0749,
                y: 315.8198,
                z: 218.0386
            },
            flat_size: 5
        },

    ]


    for (const a of array) {
        mp.world.requestIpl(a.code);
        let res = await ctx.run({
            token: true,
            model: "apartment_type",
            method: "create",
            body: a

        })
    }

}
    /*
Mody 2 Apartment	apa_v_mp_h_02_c	new mp.Vector3(-786.8195, 315.5634, 187.9137);
Mody 3 Apartment	apa_v_mp_h_02_b	new mp.Vector3(-774.1382, 342.0316, 196.6864);
Vibrant 1 Apartment	apa_v_mp_h_03_a	new mp.Vector3(-786.6245, 315.6175, 217.6385);
Vibrant 2 Apartment	apa_v_mp_h_03_c	new mp.Vector3(-786.9584, 315.7974, 187.9135);
Vibrant 3 Apartment	apa_v_mp_h_03_b	new mp.Vector3(-774.0223, 342.1718, 196.6863);
Sharp 1 Apartment	apa_v_mp_h_04_a	new mp.Vector3(-787.0902, 315.7039, 217.6384);
Sharp 2 Apartment	apa_v_mp_h_04_c	new mp.Vector3(-787.0155, 315.7071, 187.9135);
Sharp 3 Apartment	apa_v_mp_h_04_b	new mp.Vector3(-773.8976, 342.1525, 196.6863);
Monochrome 1 Apartment	apa_v_mp_h_05_a	new mp.Vector3(-786.9887, 315.7393, 217.6386);
Monochrome 2 Apartment	apa_v_mp_h_05_c	new mp.Vector3(-786.8809, 315.6634, 187.9136);
Monochrome 3 Apartment	apa_v_mp_h_05_b	new mp.Vector3(-774.0675, 342.0773, 196.6864);
Seductive 1 Apartment	apa_v_mp_h_06_a	new mp.Vector3(-787.1423, 315.6943, 217.6384);
Seductive 2 Apartment	apa_v_mp_h_06_c	new mp.Vector3(-787.0961, 315.815, 187.9135);
Seductive 3 Apartment	apa_v_mp_h_06_b	new mp.Vector3(-773.9552, 341.9892, 196.6862);
Regal 1 Apartment	apa_v_mp_h_07_a	new mp.Vector3(-787.029, 315.7113, 217.6385);
Regal 2 Apartment	apa_v_mp_h_07_c	new mp.Vector3(-787.0574, 315.6567, 187.9135);
Regal 3 Apartment	apa_v_mp_h_07_b	new mp.Vector3(-774.0109, 342.0965, 196.6863);
Aqua 1 Apartment	apa_v_mp_h_08_a	new mp.Vector3(-786.9469, 315.5655, 217.6383);
Aqua 2 Apartment	apa_v_mp_h_08_c	new mp.Vector3(-786.9756, 315.723, 187.9134);
Aqua 3 Apartment	apa_v_mp_h_08_b	new mp.Vector3(-774.0349, 342.0296, 196.6862);
*/






