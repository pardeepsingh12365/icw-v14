const Discord = require("discord.js");
const config = require("../config.js");
exports.run = async (bot, message, args, command, db) => {
  let arg2 = args.join("").substring(3);
  const brbstatus = (await db
    .ref(`users/${message.author.id}`)
    .child("brbmessage")
    .once("value")).val();
  if (!arg2) {
    if (brbstatus === null || !brbstatus) {
      message.channel.send({content:
        `you have no offline status message for clear \nif you want to set then add a message after command \nlike- \`\`${config.prefix}afk busy\`\``
      });
    } else {
      db.ref("users/" + message.author.id + "/brbmessage")
        .remove()
        .catch(function(err) {
          message.channel.send({content: err + "\n\n\n"});
        });
      message.channel.send({content:`offline status is clear`});
    }
  } else {
    db.ref("users/" + message.author.id)
      .update({
        brbmessage: arg2
      })
      .catch(function(err) {
        message.channel.send({content:err + "\n\n\n"});
      });
    message.channel.send({content:
      `offline status set: \`\`${arg2}\`\` \nif you want to clear offline status use only \`\`afk\`\``
                         });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["berightback", "brb"],
  permLevel: "No permission need",
  manu: false
};

exports.help = {
  name: "afk",
  category: "useful",
  description: "for set a offline status",
  usage: "$afk your message"
};
