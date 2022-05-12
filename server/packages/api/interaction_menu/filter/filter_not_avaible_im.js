module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "filter_not_avaible_im",
        function: async function (payload, ctx, state) {
            const arr = []
            for (const im of payload.response.data) {

                const res = await im.control()
                if (res) {
                    arr.push(im)
                }
            }
            payload.response.data = arr
        },
    });
};
