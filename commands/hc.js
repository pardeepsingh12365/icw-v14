const Discord = require('discord.js')
const config = require("../config.js")
const request = require('request');
exports.run = async (bot, message, args, command, db) => {
            if (message.author.id !== config.botowner) {
                message.reply('this command is only for bot owner!!!');
                return;
            }
            let input = args.join().substring(1);
            const data = {
                html: `<divclass='box'>${input}</div>`,
                css: ".box{border:4pxsolid#03B875;padding:20px;font-family:'Roboto';}",
                google_fonts: "Roboto"
            }
            request.post({
                    url: 'https://hcti.io/v1/image',
                    form: data
                })
                .auth(process.env.HCTI_ID, process.env.HCTI_KEY)
                .on('data', function(data) {
                    const image = JSON.parse(data)
                    message.channel.send({ files: [{ name: 'image.png', attachment: image["url"] }] });
                })
        }

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['-hc'],
	permLevel: 'bot owner only',
  manu: false
};

exports.help = {
	name: 'hc',
	category: 'owner-only',
	description: 'for html css to image',
	usage: '$hc code'
};