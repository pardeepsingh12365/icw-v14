const Discord = require("discord.js");
const config = require("../config.js");
exports.run = async (bot, message, args, command, db) => {
  if (
    message.author.id !== config.botowner &&
    !message.member.permissions.has("MANAGE_GUILD")
  ) {
    return message.channel.send({
      content: `you dont have permission to do that.\npermission missing \`\`manage server\`\``,
    });
  }
  const autojoin = (
    await db.ref(`servers/${message.guild.id}`).child("autojoin").once("value")
  ).val();
  const altime = (
    await db.ref(`servers/${message.guild.id}`).child("altime").once("value")
  ).val();

  let arg = args.join().substring(command.length);
  let ar = arg.slice().trim().split(/ +/g);
  let c = ar.shift().toLowerCase();
  if (c === "on" || c === "enable") {
    db.ref("servers/" + message.guild.id)
      .update({
        autojoin: true,
      })
      .catch(function (err) {
        message.channel.send({ content: err + "\n\n\n" });
      });
    message.channel.send({
      content: `voice channel auto-join is  turned **on** for ${message.guild.name} server`,
    });
  } else if (c === "off" || c === "disable") {
    db.ref("servers/" + message.guild.id)
      .update({
        autojoin: false,
      })
      .catch(function (err) {
        message.channel.send({ content: err + "\n\n\n" });
      });
    message.channel.send({
      content: `voice channel auto-join is  turned **off** for ${message.guild.name} server`,
    });
  } else if (c === "setfff" || c === "settimefff") {
    let lt = arg.substring(c.length);
    if (!lt || lt < 0 || lt > 300 || isNaN(lt))
      return message.channel.send({
        content: `please add a correct time in 0 to 300sec. after command\nlike \`\`${config.prefix}autoleave set 200\`\``,
      });
    db.ref("servers/" + message.guild.id)
      .update({
        altime: parseInt(lt) * 1000,
      })
      .catch(function (err) {
        message.channel.send({ content: err + "\n\n\n" });
      });
    message.channel.send({
      content: `auto voice channel join time set succesfully **${parseInt(
        lt
      )}**sec for **${message.guild.name}** server`,
    });
  } else {
    var embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: "ICW VC AUTOJOIN CONTROL",
        iconURL: `${config.icwflashlogo}`,
      })
      .setDescription(
        `${config.a} ${config.u} ${config.t} ${config.o} ${config.j} ${
          config.o
        } ${config.i} ${config.n}
:black_square_button: | \`\`autojoin on/off\`\` autojoin vc switch
      \n
      \n:black_square_button: | autojoin main switch is **${
        autojoin ? "on" : "off"
      }**`
      )
      .setImage(config.icwflahimg)
      .setFooter({
        text: `${bot.user.username}™ | Developed by: PK#1650 `,
        iconURL: `${config.pkflashlogo}`,
      })
      .setColor("BLACK")
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};

exports.conf = {
  enabled: false,
  guildOnly: true,
  aliases: ["aj", "auto-join", "autoconnect"],
  permLevel: "MANAGE_GUILD",
  manu: false,
};

exports.help = {
  name: "autojoin",
  category: "settings",
  description: "for set-up auto join voice channel in your server",
  usage: "$autojoin on\n$autojoin off",
};
