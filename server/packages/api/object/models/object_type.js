

module.exports = async function (ctx) {
    await ctx.model({
        name: 'object_type',
        mixin: ["cache"],
        database: "mongodb",
        schema: {
            joaat: {
                type: "string",
                input: "text"
            },
        },
        lifecycle: {
            read: {
                role: ["everybody"],
            },
            update: {
                role: ["system"],
            },
            create: {
                role: ["system"],
            },
            delete: {
                role: ["system"],
            },
        }
    })

    const objs = [
        {
            joaat: "ex_mp_h_acc_dec_sculpt_03"
        },
        {
            joaat: "ex_mp_h_acc_fruitbowl_01"
        },
        {
            joaat: "ex_mp_h_acc_vase_02"
        },
        {
            joaat: "ex_mp_h_acc_fruitbowl_01"
        },
        {
            joaat: "ex_mp_h_stn_chairstrip_05"
        },
        {
            joaat: "prop_box_wood07a"
        },
    ]


    for (const ot of objs) {
        let res = await ctx.run({
            token: true,
            model: "object_type",
            method: "create",
            body: ot
        })
    }

}
