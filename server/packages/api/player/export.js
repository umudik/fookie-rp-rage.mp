module.exports = async function (ctx) {

  const before = ctx.local.get("mixin", "before")

  before.object.lifecycle.read.modify.push("set_user")
  before.object.lifecycle.create.modify.push("set_user")
  before.object.lifecycle.update.modify.push("set_user")
  before.object.lifecycle.delete.modify.push("set_user")
  before.object.lifecycle.count.modify.push("set_user")
  before.object.lifecycle.test.modify.push("set_user")
  ctx.local.set("mixin", "before", before)

  await ctx.use(require("./model/player"));
  await ctx.use(require("./model/admin"));
  await ctx.use(require("./role/logged_in"));
  await ctx.use(require("./rule/has_password_email"));
  await ctx.use(require("./rule/in_game"));
  await ctx.use(require("./modify/hash_password"));
  await ctx.use(require("./modify/set_user"));
  await ctx.use(require("./method/login"));
  await ctx.use(require("./modify/set_spawn_point"));

};
