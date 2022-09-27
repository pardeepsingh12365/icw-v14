const Discord = require("discord.js");
const client = new Discord.Client();
const { ShardingManager } = require("discord.js");
const chalk = require("chalk");

const manager = new ShardingManager("./pkmain.js", {
  token: process.env.BOTTOKEN,
  autoSpawn: false,
  respawn: false
});
manager.spawn(1); // 2 shards (5,000 guilds);

manager.on("launch", shard =>
  console.log(
    chalk.red(`[SHARD] Shard `) +
      chalk.blue(shard.id + 1) +
      chalk.red("/") +
      chalk.blue(manager.totalShards)
  )
);
