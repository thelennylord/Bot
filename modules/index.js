const glob = require("glob");
const path = require("path");

const shouldLoadFile = file => {
  // Only load files starting with .js and ignore index.js files
  if (!file.endsWith(".js") || file.endsWith("index.js")) return false;

  // Don't load files/folders starting with an underscore
  let fileParts = file.split("/");
  for (var i = 0; i < fileParts.length; i++) {
    if (fileParts[i].startsWith("_")) {
      return false;
    }
  }
  return true;
};

module.exports = bot => {
  glob.sync("./modules/**/*.js").forEach(function(file) {
    // Only load .js files, don't load this file, don't load files starting with an underscore
    if (shouldLoadFile(file)) {
      try {
        bot.use(require(path.resolve(file)));
        console.info("Loaded: ", file);
      } catch (error) {
        console.error("Error loading:", file, error);
      }
    }
  });
};
