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
    let platform = params.platform || "pc";

    // Validate platform
    if (!platform.match("pc|xbl|psn")) return message.reply(``${platform} is an invalid platform, available platforms are: pc, psn or xbl.`);

    try {
      // Try to fetch stats (it will throw an error when player can't be found)
      let stats = await fetchStats(username, platform);

      message.reply( //Better to tag the executor
        prepareEmbed({
          ...stats,
          author: message.author
        })
      );
    } catch (error) {
      // Handle error
      console.error(error);

      message.reply(`Error finding ${username} on ${platform}.`); //Better to tag the executor
    }
  });
};
