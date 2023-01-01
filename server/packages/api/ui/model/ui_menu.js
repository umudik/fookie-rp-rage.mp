module.exports = async function (ctx) {
  await ctx.model({
    name: "active_menu",
    database: "store",
    schema: {
      tag: {
        type: "string",
        required: true,
      },
      entity: {
        type: "string",
        required: true,
      },
      player: {
        relation: "player",
        required: true
      }
    },
    lifecycle: {
      read: {
        role: ["everybody"],
      },
      update: {
        role: ["system"],
      },
      create: {
        accept: {
          logged_in: ["add_player_to_menu"]
        },
        role: ["system", "logged_in"],
        effect: ["menu_open"]
      },
      delete: {
        role: ["system"],
      },
      count: {
        role: ["everybody"],
      },
    },
  });


  await ctx.lifecycle({
    name: "add_player_to_menu",
    function: async function (payload, ctx, state) {
      payload.body.player = state.player.fookie_id
    }
  })
  await ctx.lifecycle({
    name: "menu_open",
    function: async function (payload, ctx, state) {
      //todo
      mp.players.callInRange(state.player.position, 15, 'apiSync', payload.body.response);
    }
  })
};
