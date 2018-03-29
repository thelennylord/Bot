const fetch = require("node-fetch");
const Discord = require("discord.js");

const prepareEmbed = require("./_embedCreator");
const fetchStats = require("./_fetchStats");

const config = require("../../config.json");

module.exports = bot => {
  if (config.fortnite.apiKey == null || config.fortnite.apiKey == "") {
    throw "No Fortnite Api Key found.";
    return;
  }

  // Simple usage command
  bot.addCommand("fn", ({ message }) => {
    message.reply(`Usage: ${config.prefix}fn <username> [platform]`);
  });

  // main command
  bot.addCommand("fn *username( *platform)", async ({ message, params }) => {
    // setup params
    let username = params.username;
    let platform = params.platform;
    if (platform == null) platform = "pc";

    // Validate platform
    if (!platform.match("pc|xbl|psn")) {
      message.channel.send(
        `${platform} is an invalid platform, available platforms are: pc, psn or xbl.`
      );

      return;
    }

    try {
      // Try to fetch stats (it will throw an error when player can't be found)
      let stats = await fetchStats(username, platform);

      message.channel.send(
        prepareEmbed({
          ...stats,
          author: message.author
        })
      );
    } catch (error) {
      // Handle error
      message.channel.send(`Error finding ${username} on ${platform}.`);
    }
  });
};
