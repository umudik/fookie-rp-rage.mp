module.exports = async function (fookie) {
    await fookie.model({
        name: "test",
        database: "store",
        mixins: [],
        schema: {
            name: {
                type: "string",
                required: true,
            },
            function: {
                type: "function",
                required: true,
            },
        }
    })

    fookie.test = async function (dec) {
        return await fookie.run({
            token: process.env.SYSTEM_TOKEN,
            model: "test",
            method: "create",
            body: dec
        })

    }

    await fookie.use(require("./inventory/inventory.js"))

    //------bootstrap-----
    await fookie.use(require("./bootstrap/create_player.js"))
    //-----start test-----


    await fookie.use(require("./inventory/item_type.js"))
    await fookie.use(require("./inventory/create_item.js"))
    await fookie.use(require("./inventory/move_item.js"))
    await fookie.use(require("./inventory/organise_inventory.js"))
    await fookie.use(require("./inventory/player_inventory.js"))

    await fookie.use(require("./crafting/craft.js"))

    await fookie.use(require("./entity/index.js"))

    await fookie.use(require("./bank/index.js"))

    await fookie.use(require("./shop/index.js"))

    await fookie.use(require("./drop/index.js"))
    //------end test------

    //------teardown------

    const test_res = await fookie.run({
        token: process.env.SYSTEM_TOKEN,
        model: "test",
        method: "read",
        query: {
            filter: {}
        }
    })

    const tests = test_res.data
    const state = {
        system_token: process.env.SYSTEM_TOKEN,
    }

    const results = []
    for (const test of tests) {
        const start = Date.now()
        try {
            console.log(`----- Starting: ${test.name} -----`);
            await test.function(state)
            const end = Date.now()
            results.push({ name: test.name, result: "PASS", ms: end - start });
        } catch (error) {
            console.log(error);
            const end = Date.now()
            results.push({ name: test.name, result: "ERROR", ms: end - start });
        }
        console.log(`----- Ended: ${test.name} -----`);
    }
    console.table(results);
}