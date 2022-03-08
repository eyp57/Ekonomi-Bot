const { Client, Message, MessageEmbed, MessageAttachment } = require("discord.js");
const { readFileSync } = require("fs");
const yaml = require("yaml");
const ayarlarFile = readFileSync('./ayarlar.yml', 'utf8')
const ayarlar = yaml.parse(ayarlarFile);
module.exports = {
    name: "Yardım",
    aliases: ["Help", "Yardim"],
    description: "Yardım komutu",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {


        const Embed = new MessageEmbed({
            title: "💎 Yardım Menüsü",
            author: {
                icon_url: message.author.displayAvatarURL(),
                name: message.author.tag
            },
            footer: {
                text: "Powered by zRooter#7295"
            },
            description: `
  - & - \`${ayarlar['Setup']['Prefix']}hesap\` -> **Hesap bilgilerini (PNG halinde) gönderir**
  - & - \`${ayarlar['Setup']['Prefix']}hesap sorgu [kullanıcı]\` -> **Hesap bilgilerini (TEXT halinde) gönderir**
  - & - \`${ayarlar['Setup']['Prefix']}hesap oluştur\` -> **Banka Hesabınızı oluşturur.**
  - & - \`${ayarlar['Setup']['Prefix']}pay [kart no] [miktar]\` -> **Girilen Kart No hesabına para gönderir.**


  - & - \`${ayarlar['Setup']['Prefix']}yardım\` -> **Burayı gösterir.**
            `,
            color: "GREEN"
        });
        message.reply({
            embeds: [Embed]
        });

    }
}