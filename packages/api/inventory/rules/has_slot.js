module.exports = async function (payload) {
    return payload.inventory_type.slotSize > payload.target.slot
}