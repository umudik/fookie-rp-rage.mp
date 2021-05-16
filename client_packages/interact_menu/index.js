mp.game.calcDist = function calcDist(v1, v2) {
    try {
        return mp.game.system.vdist(
            v1.x,
            v1.y,
            v1.z,
            v2.x,
            v2.y,
            v2.z
        );
    } catch (error) {
        mp.gui.chat.push("interval error")
        return Infinity
    }

}
mp.game.getClosest = function() {
    let c_v = null
    let c_o = null
    let c_p = null
    pos = mp.players.local.position

    mp.vehicles.forEach(e => {
        if (c_v == null)
            c_v = e
        else if (mp.game.calcDist(c_v.position, pos) > mp.game.calcDist(e.position, pos))
            c_v = e
    })
    mp.objects.forEach(e => {
        if (c_o == null)
            c_o = e
        else if (mp.game.calcDist(c_o.position, pos) > mp.game.calcDist(e.position, pos))
            c_o = e
    })
    mp.players.forEach(e => {
        if (c_p == null) {
            // if (e.id == mp.players.local.id) c_p = e
        } else if (mp.game.calcDist(c_p.position, pos) > mp.game.calcDist(e.position, pos) & e.id != mp.players.local.id)
            c_p = e
    })

    let d_o = Infinity
    let d_v = Infinity
    let d_p = Infinity

    if (c_o != null)
        d_o = mp.game.calcDist(c_o.position, pos)
    if (c_v != null)
        d_v = mp.game.calcDist(c_v.position, pos)
    if (c_p != null)
        d_p = mp.game.calcDist(c_p.position, pos)


    if (d_o < d_v & d_v < d_p) {
        return c_o
    } else if (d_v < d_p & d_v < d_o) {
        return c_v
    } else return c_p
}


mp.game.keys = {
    enter: 0x0D,
    down: 0x28,
    rigth: 0x27,
    up: 0x26,
    left: 0x25,
    y: 0x59,
}
mp.keys.bind(mp.game.keys.up, true, function() {
    if (active)
        index++
})
mp.keys.bind(mp.game.keys.down, true, function() {
    if (active)
        index--
})
mp.keys.bind(mp.game.keys.y, true, function() {
    active = !active
})
mp.keys.bind(mp.game.keys.enter, true, function() {
    if (active) {
        mp.events.callRemote('interact', JSON.stringify({
            type: menu,
            action: events[menu][index],
            id: c_obj.remoteId
        }))
    }
})



let events = {
    vehicle: ["Motor", "Envanter"],
    player: ["Envanter", "Kelepçele", "Kelepçe Çöz"],
    object: ["Envanter"],
    chest: ["Aç", "Taşı", "Kilit Kır"],
    race: ["Katıl", "Başlat", "İptal Et"]
}

let w = 0.14
let active = false
let menu = null
let c_obj = null
let index = 0



var c1 = {
    font: 0,
    color: [255, 255, 255, 255],
    scale: [0.3, 0.3],
    outline: true,
}
var c2 = {
    font: 0,
    color: [255, 165, 1, 255],
    scale: [0.37, 0.37],
    outline: false,
}

var tagOpt = {
    font: 0,
    color: [255, 255, 255, 80],
    scale: [0.3, 0.3],
    outline: false,
}

var tagOpt2 = {
    font: 0,
    color: [255, 165, 1, 120],
    scale: [0.3, 0.3],
    outline: false,
}

function drawMenu(obj) {
    try {
        if (obj.type == 'object') {
            obj.type = obj.getVariable('gametype')
        }

        for (let i in events[obj.type]) {
            let menu = events[obj.type]
            if (index > menu.length - 1) index = menu.length - 1
            if (index < 0) index = 0
            let dist = mp.game.calcDist(obj.position, pos)
            mp.game.graphics.drawText(menu[i], [obj.position.x, obj.position.y, obj.position.z + 0.8 + (i * w)], (i == index) ? c2 : c1);

        }
    } catch (error) {
        mp.console.logInfo(error)
    }
}


function drawTag(obj) {
    try {
        if (!mp.players.local.vehicle)
            mp.game.graphics.drawText("o", [obj.position.x, obj.position.y, obj.position.z], (active) ? tagOpt2 : tagOpt)
    } catch (error) {

    }

}

mp.events.add('render', () => {
    if (active & c_obj != undefined) {
        drawMenu(c_obj)
        drawTag(c_obj)
    } else {
        drawTag(c_obj)
    }
})

mp.game.ui.setTextCentre(false);
setInterval(() => {
    c_obj = mp.game.getClosest()
    if (c_obj != null) {
        pos = mp.players.local.position
        if (mp.game.calcDist(c_obj.position, pos) < 4) {
            menu = c_obj.type

        } else {
            // mp.events.call('closeUi')

            active = false
            c_obj = null
        }
    }
}, 500);

mp.events.add('playerLogin', (data) => {
    faction = data.faction
    mp.gui.chat.push("faction " + faction)
    mp.console.logInfo(data, false, false);
    if (faction == "Pd") {
        events.player.push("Kelepçele")
    } else if (faction == "Fd") {
        events.player.push("İyileştir")
    } else if (faction == "Mekanik") {
        events.vehicle.push("Modifiye")
        events.vehicle.push("Tamir")
    }
})