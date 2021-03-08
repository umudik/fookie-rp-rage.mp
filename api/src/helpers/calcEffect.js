const findRequiredRoles = require('./requiredRoles')
const { clear } = require('./index')

module.exports = async function({ user, ctx, model, method, result }) {
    if (result instanceof model.model) {
        result = await result.filter(user, method)
    }

    let effs = findRequiredRoles(model, result, method, 'effect')
    console.log(effs);
    if (effs.every(e => ctx.effects.has(e))) {
        effs.forEach(async(eff) => {
            await ctx.effects.get(eff)(user, result, ctx)
        });
    }
}