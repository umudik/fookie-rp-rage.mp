module.exports = async function (ctx) {
  await ctx.model({
    name: "admin",
    database: process.env.DATABASE,
    mixins: ["cache"],
    schema: {
      user: {
        relation: "player",
        required: true,
      },
      type: {
        type: "number",
        required: true,
        default: 100,
      }
    },
    lifecycle: {
      read: {
        role: ["system"],
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
      count: {
        role: ["system"],
      },
    },
  });
};
