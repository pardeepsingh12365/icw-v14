const Discord = require('discord.js')
const config = require("../config.js")
const request = require('request');
exports.run = async (bot, message, args, command, db) => {
  var cityname = args.join('').substring(command.length);
  if (!cityname) return message.channel.send({content:`please add a city after command like \`\`${config.prefix}weather delhi\`\``})
  var http = require('http');
  request({
    url: "http://api.weatherapi.com/v1/current.json?key=fa780773d14c41e28d053945201904&q=" + cityname//'http://api.openweathermap.org/data/2.5/weather?q=' + cityname + '&APPID=' + process.env.KEY_WEATHER
  }, (error, response, body) => {
    if (error) return;
    var data = JSON.parse(body);
    if (data.error) {
      message.channel.send({content:`❌${data.error.message}`});
      return;
    }
    //console.log(data)
    const min_c = (Math.random() * ((data.current.temp_c - 3) - (data.current.temp_c - 5)) + (data.current.temp_c - 5)).toFixed(2);
    const max_c = (Math.random() * ((data.current.temp_c + 3) - (data.current.temp_c + 5)) + (data.current.temp_c + 5)).toFixed(2);
    const min_f = (Math.random() * ((data.current.temp_f - 5) - (data.current.temp_f - 8)) + (data.current.temp_f - 8)).toFixed(2);
    const max_f = (Math.random() * ((data.current.temp_f + 5) - (data.current.temp_f + 8)) + (data.current.temp_f + 8)).toFixed(2);
    
    const embed = new Discord.EmbedBuilder()
    //.setAuthor("ICW weather info", `${config.icwflashlogo}`)
    .setColor("BLACK")
    .setDescription(`${config.w} ${config.e} ${config.a} ${config.t} ${config.h} ${config.e} ${config.r}
**${data.location.name}, ${data.location.region}(${data.location.country})**

condition: \`\`${data.current.condition.text}\`\`
temp: \`\`${data.current.temp_c}°c / ${data.current.temp_f}f\`\`
min/max: \`\`${min_c}°c/${max_c}°c\`\`
cloud: \`\`${data.current.cloud}\`\`
humidity: \`\`${data.current.humidity}\`\`
ultraviolet: \`\`${data.current.uv}\`\`
wind: \`\`${data.current.wind_kph}kmph / ${data.current.wind_mph}mph\`\`
wind direction: \`\`${data.current.wind_degree} ${data.current.wind_dir}\`\`
gust: \`\`${data.current.gust_kph}kmph / ${data.current.gust_mph}mph\`\`
pressure: \`\`${data.current.pressure_mb}mb / ${data.current.pressure_in}in\`\`
visibility: \`\`${data.current.vis_km}km / ${data.current.vis_miles}.miles\`\`
timezone: \`\`${data.location.tz_id}\`\`
localtime: \`\`${data.location.localtime}\`\`
lastupdate: \`\`${data.current.last_updated}\`\`
`)
    .setThumbnail("http:"+data.current.condition.icon)
    .setURL("https://icwbot.glitch.me")
    .setFooter({
      text: `${bot.user.username}™ | Develoed by pk#6768`,
      iconURL: `${config.pkflashlogo}`
    })
    .setImage(config.icwflahimg)
    .setTimestamp();
    message.channel.send({ embeds: [embed] });
    
  });
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['city-weather', 'cityweather'],
	permLevel: 'no permission need',
  manu: false
};

exports.help = {
	name: 'weather',
	category: 'useful',
	description: 'for check your city weather',
	usage: '$weather <city name>'
};