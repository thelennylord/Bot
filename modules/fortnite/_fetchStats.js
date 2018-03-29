const apiKey = require("../../config.json").fortnite.apiKey;
const fetch = require("node-fetch");

const processResponse = data => {
  // Checks for an error and throws it (this will trigger a "player not found" error).
  if (data.error != null) {
    throw data.error;
  }

  // Simple function to get the proper value from the key/value-object array
  // I am aware that this method requires more loops overall but I just want easily editable embeds ok?
  let getValue = key => data.lifeTimeStats.find(el => el.key == key).value;

  return {
    username: data.epicUserHandle,
    platform: data.platformNameLong,
    platformShort: data.platformName,
    top3: getValue("Top 3"), // I don't actually know what the API means by this, I'm assuming it's top 10 or something
    top3s: getValue("Top 3s"),
    top6s: getValue("Top 6s"),
    top5s: getValue("Top 5s"),
    top12s: getValue("Top 12s"),
    top25s: getValue("Top 25s"),
    matchesPlayed: getValue("Matches Played"),
    wins: getValue("Wins"),
    winPercentage: getValue("Win%"),
    kills: getValue("Kills"),
    killDeathRatio: getValue("K/d"),
    avgSurvivalTime: getValue("Avg Survival Time"),
    score: getValue("Score"),
    timePlayed: getValue("Time Played")
  };
};

module.exports = async (username, platform) => {
  // Fetch from the api, cast response to json and pass it to the processResponse function above.
  return await fetch(
    `https://api.fortnitetracker.com/v1/profile/${platform}/${username}`,
    {
      headers: {
        "TRN-Api-Key": apiKey
      }
    }
  )
    .then(response => response.json())
    .then(processResponse);
};
