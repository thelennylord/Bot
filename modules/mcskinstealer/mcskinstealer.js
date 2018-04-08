const fetch = require("node-fetch");

module.exports = bot => {
  bot.addCommand("stealskin *username", async ({ message, params }) => {
    let username = params.username;
    if (username.length > 16)
      message.reply("Username cannot be longer than 16 characters.");

    let user = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${username}`
    )
      .then(res => res.json())
      .catch(() => ({
        id: null
      }));

    if (user.id == null) {
      message.reply(`User with name ${username} does not exist.`);
      return;
    }

    let profileResponse = await fetch(
      `https://sessionserver.mojang.com/session/minecraft/profile/${user.id}`
    ).then(res => res.json());

    if (profileResponse.error != null) {
      return message.reply("You are sending too many requests!");
    }

    let texturesBlob = profileResponse.properties.find(
      prop => prop.name == "textures"
    ).value;

    let profileData = JSON.parse(
      new Buffer(texturesBlob, "base64").toString("ascii")
    );

    let skinUrl = profileData.textures.SKIN.url;

    let skinTexture = await fetch(skinUrl).then(res => res.buffer());

    message.channel.send("Here is the requested user's skin.", { files: [skinTexture] });
	
    /*let capeObj = profileData.textures.CAPE;
    if (capeObj != null) {
      let capeTexture = await fetch(capeObj.url).then(res => res.buffer());
      message.channel.send("Oh, yeah the cape too", { files: [capeTexture] });
    }*/
  });
};