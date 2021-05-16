//Models
mp.api.model(require("./models/inventory"))
mp.api.model(require("./models/inventory_type"))
mp.api.model(require("./models/item_type"))
mp.api.model(require("./models/item"))

//Rules


mp.api.rule("has_slot", require("./rules/has_slot.js"))
mp.api.rule("check_weight", require("./rules/check_weight.js"))
mp.api.rule("openable", require("./rules/openable.js"))
mp.api.rule("is_slot_avaible", require("./rules/is_slot_avaible.js"))