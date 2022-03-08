const { Client, Message } = require("discord.js");
const { readFileSync } = require("fs");
const yaml = require("yaml");
const { Database } = require("../structures/Database");
const ayarlarFile = readFileSync('./ayarlar.yml', 'utf8')
const ayarlar = yaml.parse(ayarlarFile);

module.exports = {
    event: "messageCreate",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     */
    run: async(client, message) => {

        if(!message.guild) return;
        let args = message.content.split(" ").slice(1) || [];
        let command = message.content.split(" ")[0].replace(ayarlar['Setup']['Prefix'], "");
        let cmd = client.commands.get(command.toLowerCase());
        if(cmd) {
            cmd.run(client, message, args);
        }

        let database = new Database("accounts");
        if(database.fetch(`${message.author.id}`) != null) {
            database.add(`${message.author.id}.xp`, Math.floor(Math.random() * 10));
            let XP = database.fetch(`${message.author.id}.xp`);
            let Level = database.fetch(`${message.author.id}.level`);
            if(Level == 0) {
                database.set(`${message.author.id}.level`, 1);
            }
            if(XP >= Level * 400) {
                database.set(`${message.author.id}.xp`, Math.floor(Math.random() * 10));
                database.add(`${message.author.id}.level`, 1);
                message.channel.send(`WoW! Seviye atladın ${message.author}, artık ${Level + 1}. Seviyedesin :)`);
            }
        }
        
    }
}