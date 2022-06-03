module.exports = async function (ctx) {
  await ctx.lifecycle({
    name: "in_game",
    function: async function (payload, ctx, state) {
      return lodash.has(state, "player")
    },
  });
};
