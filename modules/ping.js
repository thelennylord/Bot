module.exports = bot => {
  bot.addCommand("ping", ({ message }) => {
    message.reply("pong");
  });
};
