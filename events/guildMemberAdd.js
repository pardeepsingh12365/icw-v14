const Discord = require("discord.js");
const config = require("../config.js");
const { createCanvas, loadImage } = require('canvas')
//const Jimp = require("jimp");
module.exports = async (bot, db, member) => {
  console.log("guildMemberAdd fired")
  const wmstatus = (await db.ref(`servers/${member.guild.id}`).child("welcomeMstatus").once("value")).val();
  const wtextonoff = (await db.ref(`servers/${member.guild.id}`).child("wtextonoff").once("value")).val();
  const wimageonoff = (await db.ref(`servers/${member.guild.id}`).child("wimageonoff").once("value")).val();
  const wuinfoonoff = (await db.ref(`servers/${member.guild.id}`).child("wuinfoonoff").once("value")).val();
  const wcustomimageurl = (await db.ref(`servers/${member.guild.id}`).child("wcustomimageurl").once("value")).val();
  const wcustomimageonoff = (await db.ref(`servers/${member.guild.id}`).child("wcustomimageonoff").once("value")).val();
  const wm = (await db.ref(`servers/${member.guild.id}`).child("wmessage").once("value")).val();
  const wc = (await db.ref(`servers/${member.guild.id}`).child("wchannelid").once("value")).val();
  const autorole = (await db.ref(`servers/${member.guild.id}`).child("autorole").once("value")).val();
  const arrole = (await db.ref(`servers/${member.guild.id}`).child("arrole").once("value")).val();
  const logswitch = (await db.ref(`servers/${member.guild.id}`).child("logswitch").once("value")).val();
  const logchannelid = (await db.ref(`servers/${member.guild.id}`).child("logchannelid").once("value")).val();
  const ord = number => {
  let or;
  const num = number.toString();if (num.endsWith("1")) {or = "st";} else if (num.endsWith("2")) {or = "nd";} else if (num.endsWith("3")) {or = "rd";} else {or = "th"}return or;};
  const fn = Math.floor(Math.random() * config.wfortunes.length);
  const fact = `${config.wfortunes[fn]}`;
  const fact2 = `${fact.replace("{user}", member.user.username)}`;
  const ms = bot.guilds.cache.filter(guild => guild.ownerID === member.user.id).filter(guild => guild.memberCount > 200).map(guild => guild.name);
  const mm = bot.guilds.cache.filter(guild => guild.ownerID === member.user.id).filter(guild => guild.memberCount > 200).map(guild => guild.memberCount);
  let nemoji = bot.emojis.cache.get("439708397294714881");
  let time = member.joinedAt - member.user.createdAt;
  let d = Math.floor(time / 86400000);
  var days;
  var hours;
  if (d === 0) {
    days = "";
  } else {
    days = d + " days ";
  }
  let h = Math.floor((time / 3600000) % 24);
  if (h === 0) {
    hours = "";
  } else {
    hours = h + " hours ";
  }
  var welcomeimg;
  if (wcustomimageonoff && wcustomimageurl) {
    welcomeimg = wcustomimageurl;
  } else {
    const rn = Math.floor(Math.random() * config.wimages.length);
    welcomeimg = `${config.wimages[rn]}`;
  }
  let minutes = Math.floor((time % 3600000) / 60000) + " minutes";
  if (wmstatus === true) {
    if (wc === null) return;
    var welcomemsg;
    if (wm === null) {
      welcomemsg = `${member} welcome to ${member.guild.name} you are the ${member.guild.memberCount}${ord(member.guild.memberCount)} user`;
    } else {
      welcomemsg = `${wm.replace("{user}", member.toString()).replace("{count}", member.guild.memberCount)}`;
    }
    let uAvatar;
    if (member.user.displayAvatarURL()) {
      uAvatar = member.user.displayAvatarURL({format: "png",dynamic: true,size: 256});
    } else {
      uAvatar =  "https://cdn.discordapp.com/attachments/640098613665726464/660394889472770078/322c936a8c8be1b803cd94861bdfa868.png";
    }
    if (wimageonoff === true) {
      let u = `you are the ${member.guild.memberCount}${ord(
        member.guild.memberCount
      )} user`;
      let s = member.guild.name;

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
          
          const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(),'welcome.png')
          member.guild.channels.cache.get(wc.toString()).send({content:`${wtextonoff ? welcomemsg : ""}`,files: [attachment]})
      
      
    /*  Jimp.read(
        `https://cloud.githubusercontent.com/assets/414918/11165709/051d10b0-8b0f-11e5-864a-20ef0bada8d6.png`,
        (err, mask) => {
          Jimp.read(img, (err, image) => {
            Jimp.read(welcomeimg, (err, image2) => {
              Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(font => {
                image2.print(font, 484, 248, s);
                image2.print(font, 412, 336, u);
                image2.print(font, 412, 248, "to");
                image2.print(font, 44, 484, fact2);
                image2.print(font, 412, 36, "Welcome");
                Jimp.loadFont(Jimp.FONT_SANS_64_WHITE).then(font => {
                  image2.print(font, 480, 244, s);
                  image2.print(font, 408, 244, "to");
                  image2.print(font, 40, 480, fact2);
                  image2.print(font, 408, 332, u);
                  image2.print(font, 408, 32, "Welcome");
                  Jimp.loadFont(Jimp.FONT_SANS_128_BLACK).then(font => {
                    image2.print(font, 416, 100, member.user.tag);
                    Jimp.loadFont(Jimp.FONT_SANS_128_WHITE).then(font => {
                      image2.print(font, 408, 92, member.user.tag);
                      image2.resize(1600, 480);
                      image2.quality(60);
                      image.resize(360, 360);
                      mask.resize(360, 360);
                      image.mask(mask, 0, 0);
                      image2.composite(image, 10, 10);
                      image2.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                        
                        member.guild.channels.cache.get(wc.toString()).send({content:`${wtextonoff ? welcomemsg : ""}`},new Discord.MessageAttachment(buffer, `welcome.png`));
                      });
                    });
                  });
                });
              });
            });
          });
        });*/
    } else if (!wimageonoff && wtextonoff) {
      member.guild.channels.cache.get(wc.toString()).send({content:`${welcomemsg}`})
    }
  if (wuinfoonoff === true) {
    if (mm == 0) {
    } else {
      member.guild.channels.cache.get(wc.toString()).send({content:`:crown: Owner of ${ms} server with ${mm} members`});
    }
    if (member.user.id === config.botowner) {
      member.guild.channels.cache.get(wc.toString()).send({content:`:military_medal: Owner of ICW BOT`});
    }
    if (config.icwstaff.includes(member.user.id)) {
      member.guild.channels.cach.get(wc.toString()).send({content:`:medal: Staff member of ICW`});
    }
    if (member.user.displayAvatarURL({dynamic: true}).slice(-4) === ".gif") {
      member.guild.channels.cache.get(wc.toString()).send({content:`${bot.emojis.cache.get('722085099516198993')} NITRO USER`});
    }
    if (member.user.bot === true) {
      if (time < 432000000) {
        member.guild.channels.cache.get(wc.toString()).send({content:`:no_entry_sign: bot created ${days} ${hours} ${minutes} ago`});
      }
    }
  }
  } else { return }
  if (autorole && arrole) {
    if (!member.guild.member(bot.user).hasPermission("MANAGE_ROLES")) return;
    member.addRole(arrole).catch(err => {
      console.log(err);
    });
  }
  if (logswitch) {
    let logch = member.guild.channels.cache.get(logchannelid);
    if (!logch) {
      return undefined;
    } else {
      let addembed = new Discord.EmbedBuilder()
        .setColor("BLACK")
        .setAuthor({
          name: "Member Joined " + member.user.tag.toString(),
          iconURL: member.user.displayAvatarURL({format: "png",dynamic: true,size: 1024})
        })
        .setDescription(`**New Member**: <@${member.user.tag}> (${member.user.id})`)
        .setThumbnail(member.user.displayAvatarURL({format: "png",dynamic: true,size: 512}))
        .setImage(config.icwflahimg)
        .setFooter({
          text: `${bot.user.username}™ | Developed by: PK#1650 `,
          iconURL: `${config.pkflashlogo}`
        })
        .setTimestamp();
      logch.send({ embeds: [addembed] });
    }
  }
};

/*const inviter = await getInviter(bot, db, member)
let cachedInvites = new Map();
exports.ready = async (bot) => {
    await bot.guilds.forEach(async (guild) => cachedInvites.set(guild.id, await guild.fetchInvites()));
    return bot.guilds.size;
};

async function getInviter(bot, db, guildMember) {
    const invites = await guildMember.guild.fetchInvites();
  console.log(invites)
    db.ref('servers/' + guildMember.guild.id + '/invites').update({
            invites: invites
        }).catch(function(err) {
            console.log(err + "\n\n\n");
        });
    if (!cachedInvites.has(guildMember.guild.id)) {
      cachedInvites.set(guildMember.guild.id, invites); return false
    }
    const diff = invites.filter((invite) => 
                                cachedInvites
                                .get(guildMember.guild.id)
                                .get(invite.code) && cachedInvites
                                .get(guildMember.guild.id)
                                .get(invite.code)
                                .uses != invite.uses);
    if (diff.length < 1) return false;
    cachedInvites.set(guildMember.guild.id, invites);
    return diff.first().inviter;
}*/
