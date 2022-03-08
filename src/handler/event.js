const { Collection } = require("discord.js");
const glob = require("glob");

module.exports = async(client) => {
    glob.glob("./src/events/*.js", function(err, files) {
        console.log(files.length + " Event yüklenecek.")
        files.map(async(file) => {
            const evntProps = require("../../" + file);
            client.on(evntProps.event, evntProps.run.bind(null, client));
            console.log(evntProps.event + " Eventi yüklendi!")
        })
    });
}