const sha256 = require("crypto-js/sha256");
const jwt = require("jsonwebtoken");

module.exports = async function (ctx) {
  let player = ctx.local.get("model", "player")
  player.methods.login = async function (payload, ctx, state) {
    let res = await ctx.run({
      token: process.env.SYSTEM_TOKEN,
      model: "player",
      method: "read",
      query: {
        filter: {
          email: payload.query.filter.email,
          password: sha256(payload.query.filter.password).toString(),
        }
      },
    });

    if (res.data.length > 0) {
      payload.response.data = {
        token: jwt.sign(res.data[0], process.env.SYSTEM_TOKEN),
        [ctx.helpers.pk("player")]: res.data[0][ctx.helpers.pk("player")]
      }
    } else {
      payload.response.data = "login_error"
      payload.response.status = false
    }
  }

  player.lifecycle.login = {
    preRule: ["valid_payload", "default_payload", "has_model", "has_method"],
    role: [],
    rule: [],
    modify: [],
    effect: [],
    filter: []
  }
  ctx.local.set("model", player)
};
