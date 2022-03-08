const { Client, User } = require("discord.js");
const { readFileSync } = require("fs");
const client = new Client({
    intents: [32767]
});
const yaml = require("yaml");
const { Database } = require("./src/structures/Database");
const ayarlarFile = readFileSync('./ayarlar.yml', 'utf8')
const ayarlar = yaml.parse(ayarlarFile);
require("./src/handler/command")(client);
require("./src/handler/event")(client);

client.getUserFromCardNo = (cardno) => {
    let database = new Database("accounts");
    let db = database.fetchAll();
    let card;
    db.map(async(acc) => acc['data']['card_no'] == cardno ? card = acc : null);

    if(card == null) {
        return null;
    }

    return card;
}

client.login(ayarlar['Setup']['Token']);