const weatherURL = 'http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/347625?apikey=hTELp2Lc4vAy2k5FtQ5V1blYymjlLyPK'; //Los Angeles
const timeURL = 'http://worldtimeapi.org/api/timezone/Europe/Istanbul' //İstanbul

mp.world.time.hour = new Date().getHours();
mp.world.time.minute = new Date().getMinutes();
mp.world.time.second = new Date().getSeconds();

console.log(`[SERVER] ${mp.world.time.hour}:${mp.world.time.minute}:${mp.world.time.second} `);
setInterval(() => {
    mp.world.time.second++
    if (mp.world.time.second == 60) {
        mp.world.time.second = 0
        mp.world.time.minute++
    }
    
    if (mp.world.time.minute == 60) {
        mp.world.time.minute = 0
        mp.world.time.hour++
    }

    if (mp.world.time.hour == 24) {
        mp.world.time.hour = 0        
    }
}, 100);


