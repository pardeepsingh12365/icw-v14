const Discord = require('discord.js')
const config = require("../config.js")
//const Jimp = require("jimp");
const { createCanvas, loadImage } = require("canvas")

exports.run = async (bot, message, args, command, db) => {
  
  const wchannelid = (await db.ref(`servers/${message.guild.id}`).child('wchannelid').once('value')).val();
  const wtextonoff = (await db.ref(`servers/${message.guild.id}`).child('wtextonoff').once('value')).val();
  const wleavetextonoff = (await db.ref(`servers/${message.guild.id}`).child('wleavetextonoff').once('value')).val();
  const wimageonoff = (await db.ref(`servers/${message.guild.id}`).child('wimageonoff').once('value')).val();
  const wuinfoonoff = (await db.ref(`servers/${message.guild.id}`).child('wuinfoonoff').once('value')).val();
  const welcomeMstatus = (await db.ref(`servers/${message.guild.id}`).child('welcomeMstatus').once('value')).val();
  const wcustomimageonoff = (await db.ref(`servers/${message.guild.id}`).child('wcustomimageonoff').once('value')).val();
  const wcustomimageurl = (await db.ref(`servers/${message.guild.id}`).child('wcustomimageurl').once('value')).val();
  const wm = (await db.ref(`servers/${message.guild.id}`).child('wmessage').once('value')).val();
  const ord = number => { let or; const num = number.toString(); if (num.endsWith("1")) { or = "st"; } else if (num.endsWith("2")) { or = "nd"; } else if (num.endsWith("3")) { or = "rd"; } else { or = "th"; } return or; };

  let arg = args.join().substring(7);
  let ar = arg.slice().trim().split(/ +/g);
  let c = ar.shift().toLowerCase();
  if (c === "on") {
      if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content:`U don't have permission to do that`});
    if (!wchannelid || wchannelid === null) return message.channel.send({content:`please set welcome channel first with command \`\`${config.prefix}welcome set-channel #channel\`\``})        
    db.ref('servers/' + message.guild.id).update({
                welcomeMstatus: true,
                wimageonoff: true,
                wtextonoff: true,
                wuinfoonoff: true
            }).catch(function(err) {
                message.channel.send({content:err + "\n\n\n"});
            });
            message.channel.send({content:`welcome message turned **on** for ${message.guild.name} server`})
  } else if (c === "off") {
            if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content:`U don't have permission to do that`});
            db.ref('servers/' + message.guild.id).update({
                welcomeMstatus: false
            }).catch(function(err) {
                message.channel.send({content:err + "\n\n\n"});
            });
            message.channel.send({content:`welcome message turned **off** for ${message.guild.name} server`})
  } else if (c === "use-jointext") {
            if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content:`U don't have permission to do that`});
            if (wchannelid === null) return message.channel.send({content:`welcome channel not set please set the channel first with \`\`${config.prefix}welcome set-channel <#channel>\`\``})
            if (!wtextonoff && wtextonoff === false) {
                db.ref('servers/' + message.guild.id).update({
                    wtextonoff: true
                }).catch(function(err) {
                    message.channel.send({content:err + "\n\n\n"});
                });
                message.channel.send({content:"welcome join text is now enabled"});
            }
            if (wtextonoff === true) {
                db.ref('servers/' + message.guild.id).update({
                    wtextonoff: false
                }).catch(function(err) {
                    message.channel.send({content:err + "\n\n\n"});
                });
                message.channel.send({content:"welcome join text is now disabled"});
            }
  } else if (c === "use-leavetext") {
            if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content:`U don't have permission to do that`});
            if (wchannelid === null) return message.channel.send({content:`welcome channel not set please set the channel first with \`\`${config.prefix}welcome set-channel <#channel>\`\``})
            if (!wleavetextonoff) {
                db.ref('servers/' + message.guild.id).update({
                    wleavetextonoff: true
                }).catch(function(err) {
                    message.channel.send({content:err + "\n\n\n"});
                });
                message.channel.send({content:"leave text is now enabled"});
            }
            if (wleavetextonoff === true) {
                db.ref('servers/' + message.guild.id).update({
                    wleavetextonoff: false
                }).catch(function(err) {
                    message.channel.send({content:err + "\n\n\n"});
                });
                message.channel.send({content:"leave text is now disabled"});
            }
  } else if (c === "use-image") {
            if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content:`U don't have permission to do that`});
            if (wchannelid === null) return message.channel.send({content:`welcome channel not set please set the channel first with \`\`${config.prefix}welcome set-channel <#channel>\`\``});
            if (!wimageonoff && wimageonoff === false) {
                db.ref('servers/' + message.guild.id).update({
                    wimageonoff: true
                }).catch(function(err) {
                    message.channel.send({content:err + "\n\n\n"});
                });
                message.channel.send({content:"welcome image is now enabled"});
            }
            if (wimageonoff === true) {
                db.ref('servers/' + message.guild.id).update({
                    wimageonoff: false
                }).catch(function(err) {
                    message.channel.send({content:err + "\n\n\n"});
                });
                message.channel.send({content:"welcome image is now disabled"});
            }
  } else if (c === "use-customimage") {
            if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content:`U don't have permission to do that`});
            if (wchannelid === null) return message.channel.send({content:`welcome channel not set please set the channel first with \`\`${config.prefix}welcome set-channel <#channel>\`\``});
            if (wcustomimageurl === null) return message.channel.send({content:`not find any image please first set a custom image with commands \`\`${config.prefix}welcome set-customimage https://welcomecustomimage.jpg\`\`\nuse only 1600px x 600px image and .jpg or .png`})
            if (!wcustomimageonoff && wcustomimageonoff === false) {
                db.ref('servers/' + message.guild.id).update({
                    wcustomimageonoff: true
                }).catch(function(err) {
                    message.channel.send({content:err + "\n\n\n"});
                });
                message.channel.send({content:"welcome custom image is now enabled"});
            }
            if (wcustomimageonoff === true) {
                db.ref('servers/' + message.guild.id).update({
                    wcustomimageonoff: false
                }).catch(function(err) {
                    message.channel.send({content:err + "\n\n\n"});
                });
                message.channel.send({content:"welcome custom image is now disabled"});
            }
  } else if (c === "use-userinfo") {
            if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content:`U don't have permission to do that`});
            if (wchannelid === null) return message.channel.send({content:`welcome channel not set please set the channel first with \`\`${config.prefix}welcome set-channel <#channel>\`\``})
            if (!wuinfoonoff && wuinfoonoff === false) {
                db.ref('servers/' + message.guild.id).update({
                    wuinfoonoff: true
                }).catch(function(err) {
                    message.channel.send({content:err + "\n\n\n"});
                });
                message.channel.send({content:"welcome userinfo is now enabled"});
            }
            if (wuinfoonoff === true) {
                db.ref('servers/' + message.guild.id).update({
                    wuinfoonoff: false
                }).catch(function(err) {
                    message.channel.send({content:err + "\n\n\n"});
                });
                message.channel.send({content:"welcome userinfo is now disabled"});
            }
  } else if (c === "set-joinmessage") {
            if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content:`U don't have permission to do that`});
            if (wchannelid === null) return message.channel.send({content:`welcome channel not set please set the channel first with \`\`${config.prefix}welcome set-channel <#channel>\`\``});
            let arg2 = arg.substring(c.length)
            if (!arg2) return message.channel.send({content:`please add a welcome message after command like \n\`\`{user} welcome to the ${message.guild.name} server now we have {members} members\`\` \n{user} is welcome member \n{count} is total members of server`})
            db.ref('servers/' + message.guild.id).update({
                wmessage: arg2
            }).catch(function(err) {
                message.channel.send({content:err + "\n\n\n"});
            });
            message.channel.send({content:`welcome message set successfully \n${arg2}`})
        } else if (c === "set-leavemessage") {
            if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content:`U don't have permission to do that`});
            if (wchannelid === null) return message.channel.send({content:`welcome channel not set please set the channel first with \`\`${config.prefix}welcome set-channel <#channel>\`\``});
            let arg2 = arg.substring(c.length)
            if (!arg2) return message.channel.send({content:`please add a leave message after command like \n\`\`{user} user is left the server now we are {members} members\`\` \n{user} is welcome member \n{count} is total members of server`})
            db.ref('servers/' + message.guild.id).update({
                lmessage: arg2
            }).catch(function(err) {
                message.channel.send({content:err + "\n\n\n"});
            });
            message.channel.send({content:`leave message set successfully \n${arg2}`})
        } else if (c === "set-customimage") {
            if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content:`U don't have permission to do that`});
            if (wchannelid === null) return message.channel.send({content:`welcome channel not set please set the channel first with \`\`${config.prefix}welcome set-channel <#channel>\`\``});
            let arg2 = arg.substring(c.length);
            let arg3 = arg2.slice().trim().split(/ +/g).join(" ")
            if (!arg3) return message.channel.send({content:`please add image url after command like \n\`\`${config.prefix}welcome set-customimage https://customwelcomeimage.jpg\`\`\nuse only 1600px x 600px image and .jpg .jpegor .png`})
            let arg4 = arg3.slice(arg3.length-4)
            if (arg3.match(/\.(jpeg|jpg|png)$/) == null) return message.channel.send({content:`its not a vaild url plz check your url is a image url.\nonly .jpg .jpeg or .png and 1600px × 600px are valid`});
            db.ref('servers/' + message.guild.id).update({
                wcustomimageurl: arg3
            }).catch(function(err) {
                message.channel.send({content:err + "\n\n\n"});
            });
            message.channel.send({content:`custom image set successfully \n${arg3}`})
        } else if (c === "set-channel" || c === "setchannel") {
            if (message.author.id !== config.botowner && !message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content:`U don't have permission to do that`})
            let wc = message.mentions.channels.first()
            if (!wc) return message.channel.send({content:`please mention a channel after command like \`\`${config.prefix}welcome set-channel #general\`\``})
            db.ref('servers/' + message.guild.id).update({
                wchannelid: wc.id
            }).catch(function(err) {
                message.channel.send({content:err + "\n\n\n"});
            });
            message.channel.send({content:`welcome channel set succesfully ${wc.name} for ${message.guild.name} server`})
        } else if (c === "jointest") {
            let member = message.mentions.members.first()
            if (!member) return message.channel.send({content:`Please mentions someone like \`\`${config.prefix}welcome jointest <@${message.author.tag}>\`\``});
            const fn = Math.floor(Math.random() * config.wfortunes.length);
            const fact = `${config.wfortunes[fn]}`;
            const fact2 = `${fact.replace('{user}', member.user.username)}`
            const rn = Math.floor(Math.random() * config.wimages.length);
            const images = `${config.wimages[rn]}`;
            var welcomeimg;
            if (wcustomimageonoff &&  wcustomimageurl) {
              welcomeimg = wcustomimageurl
            } else {
              welcomeimg = images;
            }
            let u = `you are the ${member.guild.memberCount}${ord(member.guild.memberCount)} user`;
            let s = member.guild.name;
            let uAvatar = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
            var welcomemsg;
            if (wm === null) {
                welcomemsg = `${member} welcome to ${member.guild.name} you are the ${member.guild.memberCount}${ord(member.guild.memberCount)} user`;
            } else {
                let splt  = wm.split(" ")
                console.log(splt)
                let fltr = splt.filter(txt => txt.startsWith("{:"))
                console.log(fltr)
                welcomemsg = `${wm.replace('{user}', member.toString()).replace('{count}', member.guild.memberCount)}`;
            }
          //let backgroundimage = 'https://media.discordapp.net/attachments/1004753081831006339/1004754580850098288/outrun-wallpaper-1600x600.jpg';
          const canvas = createCanvas(1600,600)
          const ctx = canvas.getContext('2d')
          const backgroundimage = await loadImage(welcomeimg)
          ctx.drawImage(backgroundimage,0,0,canvas.width,canvas.height)

          ctx.shadowOffsetX = 10;
          ctx.shadowOffsetY = 10;
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
          ctx.font = '64px sans-serif'
          ctx.textAlign = 'left'
          ctx.fillStyle = "#FFFFFF"
          ctx.fillText(`welcome`,450,100)
          ctx.fillText(`to ${s}`,450,340)
          ctx.fillText(`${u}`,450,440)
          ctx.fillText(`${fact2}`,100,550)
          
          
          ctx.shadowOffsetX = 10;
          ctx.shadowOffsetY = 10;
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
          ctx.font = '128px sans-serif'
          ctx.textAlign = 'left'
          ctx.fillStyle = "#FFFFFF"
          ctx.fillText(`${member.user.tag}`,450, 240)
          
          const avatar = await loadImage(uAvatar)
          ctx.arc(230, 230, 200, 0, Math.PI * 2, false)
          ctx.strokeStyle = '#2465D3'
          ctx.stroke()
          ctx.clip()
          ctx.drawImage(avatar,30,30,400,400)
          
          const attachment = new Discord.MessageAttachment(canvas.toBuffer(),'welcome.png')
          message.channel.send({files: [attachment]})
          
        } else {
            let welcomeembed = new Discord.EmbedBuilder()
            .setAuthor({
              name: "ICW WELCOME CONTROL",
              iconURL: `${config.icwflashlogo}`
            })
            .setDescription(`:black_square_button: | \`\`on/off\`\` welcome main switch
\n:black_square_button: | \`\`use-image\`\` switch of welcome image
\n:black_square_button: | \`\`use-jointext\`\` switch of user join text
\n:black_square_button: | \`\`use-leavetext\`\` switch of user leave text
\n:black_square_button: | \`\`use-customimage\`\` switch of custom welcome image
\n:black_square_button: | \`\`use-userinfo\`\` switch of userinfo (if user is owner of 200+ members server or many things...)
\n:black_square_button: | \`\`set-customimage\`\` set custom image for welcome
\n:black_square_button: | \`\`set-joinmessage <message>\`\` set join message for welcome
\n:black_square_button: | \`\`set-leavemessage <message>\`\` set leave message
\n:black_square_button: | \`\`set-channel #channel\`\` set channel for welcome
\n:black_square_button: | \`\`jointest @${message.author.tag}\`\` test the welcome
\n
**Current Settings :-**
:black_square_button: | welcome main switch is **${welcomeMstatus ? "on" : "off"}**
:black_square_button: | welcome channel is **${wchannelid ? `<#${wchannelid}>` : "Not Set"}**
:black_square_button: | welcome join text switch is **${wtextonoff ? "on" : "off"}**
:black_square_button: | welcome leave text switch is **${wleavetextonoff ? "on" : "off"}**
:black_square_button: | welcome userinfo text switch is **${wuinfoonoff ? "on" : "off"}**
:black_square_button: | welcome image switch is **${wimageonoff ? "on" : "off"}**
:black_square_button: | welcome custom-image switch is **${wcustomimageonoff ? "on" : "off"}**
:black_square_button: | welcome custom-image url is ${wcustomimageurl ? wcustomimageurl : "**Not Set**"}`)
            .setImage(config.icwflahimg)
            .setFooter({
              text: `${bot.user.username}™ | Developed by: PK#1650 `,
              iconURL: `${config.pkflashlogo}`
            })
            .setColor("BLACK")
            .setTimestamp();
            message.channel.send({embeds: [welcomeembed]});
        }
    }

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['welcame'],
	permLevel: 'MANAGE_GUILD',
  manu: false
};

exports.help = {
	name: 'welcome',
	category: 'settings',
	description: 'for welcoming new members with random or custom images and more things check it.',
	usage: '$welcome'
};