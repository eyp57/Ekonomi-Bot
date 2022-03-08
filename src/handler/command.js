const { Collection } = require("discord.js");
const glob = require("glob");

module.exports = async(client) => {
    client.commands = new Collection();
    glob.glob("./src/commands/**/*.js", function(err, files) {
        console.log(files.length + " komut yüklenecek.")
        files.map(async(file) => {
            const cmdProps = require("../../" + file);
            client.commands.set(cmdProps.name.toLowerCase(), cmdProps);
            cmdProps.aliases?.map((alias) => {
                client.commands.set(alias.toLowerCase(), cmdProps);
            })
            console.log(cmdProps.name + " komutu yüklendi!")
        })
    });
}