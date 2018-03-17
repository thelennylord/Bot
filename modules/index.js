const glob = require('glob')
const path = require('path')

module.exports = bot => {
    glob.sync('./modules/**/*.js').forEach(function (file) {
        // Only load .js files, don't load this file, don't load files starting with an underscore
        if (file.endsWith('.js') && !file.endsWith("index.js") && !file.startsWith("_")) {
            try {
                bot.use(require(path.resolve(file)))
                console.info("Loaded: ", file)
            } catch (error) {
                console.error("Error loading:", file, error)
            }
        }
    });
}
