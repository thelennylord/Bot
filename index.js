const TortleBot = require("tortlebot-core");
const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client({
  autoReconnect: true
});

const bot = new TortleBot(client);

bot.setPrefix(config.prefix); // Defaults to !

bot.use(require("./modules"));

client
  .login(config.token)
  .then(() => {
    console.log("Bot logged-in successfully.");
  })
  .catch(err => {
    console.error("Could not login, is your token correct?");
    console.error("Please check your config.json");
    console.error("Error below:");
    console.error(err);
  });
