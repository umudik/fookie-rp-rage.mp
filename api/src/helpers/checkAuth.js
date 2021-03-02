const findRequiredRoles = require('./requiredRoles')

module.exports = function(user, body, model, field, method, roles, selector, cb) {
    let requiredRoles = findRequiredRoles(model, field, method, selector)
    if (requiredRoles.every(i => roles.has(i))) {
        let res = requiredRoles.some(i => roles.get(i)(user, body))
        if (res) {
            if (typeof cb == 'function') cb(body, field)
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}