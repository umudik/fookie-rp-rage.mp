const findRequiredRoles = require('./requiredRoles')

module.exports = function({ user, body, model, method, ctx }) {

    if (method == "get" || method == "getAll") return true

    let requiredRoles = findRequiredRoles(model, body, method)
    if (requiredRoles.every(i => ctx.roles.has(i))) {
        let res = requiredRoles.some(i => ctx.roles.get(i)(user, body))
        if (res) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}


/*

get ->  {}

post {name:"umut",point:56}

patch  {name:"umut",point:57}

delete   {id:1}

*/