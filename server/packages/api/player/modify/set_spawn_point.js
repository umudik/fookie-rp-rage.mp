const sha256 = require("crypto-js/sha256");
module.exports = async function (ctx) {
  await ctx.lifecycle({
    name: "set_spawn_point",
    function: async function (payload, ctx, state) {
      payload.body.position = {
        x: 0,
        y: 0,
        z: 72,
      }
    },
  });
};
