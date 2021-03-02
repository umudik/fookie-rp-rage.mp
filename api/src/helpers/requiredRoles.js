module.exports = function(model, field, method, selector) {
    let t2 = ['post', 'delete']
    if (t2.includes(method)) {
        return model.appgen[method][selector]
    } else {
        return model.schema[field].appgen[method][selector]
    }

}