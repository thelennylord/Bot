const Discord = require("discord.js");
const config = require("../../config.json");

// This function creates an embed
// Feel free to edit it
// The object argument shows what data it has

module.exports = ({
  username,
  top3, // I don't actually know what the API means by this, I'm assuming it's top 10 or something
  top3s,
  top6s,
  top5s,
  top12s,
  top25s,
  matchesPlayed,
  wins,
  winPercentage, // String including the percentage
  kills,
  killDeathRatio, // String including the slash character
  avgSurvivalTime, // String including "hr, min" etc
  platform,
  platformShort,
  score,
  timePlayed, // String including "hr, min" etc
  author // Discord.js User instance.
}) => {
  let embed = new Discord.RichEmbed();

  // Set the color depending on platform
  if (platformShort == "pc") embed.setColor("ORANGE");
  if (platformShort == "psn") embed.setColor("BLUE");
  if (platformShort == "xbox") embed.setColor("GREEN");

  // set the title
  embed.setTitle(`${username} on ${platform}`);
  embed.setURL("https://google.com");

  // Set the author
  embed.setAuthor("Stats by Quoko", config.fortnite.logo, "https://google.com");

  // Set the footer
  embed.setFooter(`Requested by ${author.tag}`, author.avatarURL);

  // set the fields.
  embed.addField("Username", username, true);
  embed.addField("Platform", platform, true);
  embed.addBlankField(true);

  embed.addField("Top 3s", top3s, true);
  embed.addField("Top 5s", top5s, true);
  embed.addBlankField(true);

  embed.addField("Top 6s", top6s, true);
  embed.addField("Top 12s", top12s, true);
  embed.addBlankField(true);

  embed.addField("Top 25s", top25s, true);
  embed.addField("Score", score, true);
  embed.addBlankField(true);

  embed.addField("Match Played", matchesPlayed, true);
  embed.addField("Wins", wins, true);
  embed.addBlankField(true);

  embed.addField("Win Percentage", winPercentage, true);
  embed.addField("Kills", kills, true);
  embed.addBlankField(true);

  embed.addField("K/D Ratio", killDeathRatio, true);
  embed.addField("Time played", timePlayed, true);
  embed.addBlankField(true);

  embed.addField("Average survival time", avgSurvivalTime, true);
  embed.addBlankField(true);
  embed.addBlankField(true);

  return embed;
};
