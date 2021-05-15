const weatherURL = 'http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/347625?apikey=hTELp2Lc4vAy2k5FtQ5V1blYymjlLyPK'; //Los Angeles
const timeURL = 'http://worldtimeapi.org/api/timezone/Europe/Istanbul' //İstanbul

mp.world.time.hour = new Date().getHours();
mp.world.time.minute = new Date().getMinutes();
mp.world.time.second = new Date().getSeconds();

console.log(`[SERVER] ${mp.world.time.hour}:${mp.world.time.minute}:${mp.world.time.second} `);