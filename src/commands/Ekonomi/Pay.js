const { Client, Message, MessageEmbed, MessageAttachment } = require("discord.js");
const { Database } = require("../../structures/Database");
const abbrev = require("../../structures/abbrev");

module.exports = {
    name: "Pay",
    aliases: ["Gönder", "Öde"],
    description: "Hesap Komutu",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        const database = new Database("accounts");

        const Embed = new MessageEmbed({
            title: "Para gönderme",
            author: {
                icon_url: message.author.displayAvatarURL(),
                name: message.author.tag
            },
            footer: {
                text: "Powered by zRooter#7295"
            }
        });
        if(database.fetch(`${message.author.id}`) == null) return message.reply({ embeds: [ Embed.setDescription("Lütfen bir hesap oluşturunuz! `!hesap oluştur`").setColor("RED") ] });
        let card_no = parseInt(args[0]);
        let amount = parseInt(args[1]);
        if(card_no == "NaN" || isNaN(card_no)) return message.reply({ embeds: [Embed.setDescription("Lütfen geçerli bir Kart Numarası giriniz.").setColor("RED") ] });
        if(amount == "NaN" || isNaN(amount)) return message.reply({ embeds: [Embed.setDescription("Lütfen geçerli bir Miktar giriniz.").setColor("RED") ] });
        let card = client.getUserFromCardNo(card_no);
        if(card == null || card == undefined) return message.reply({ embeds: [Embed.setDescription("Bu kart kimseye ait değil :flushed:").setColor("RED")]});
        if(database.fetch(`${message.author.id}.coin`) < amount) return message.reply({ embeds: [Embed.setDescription("Yeterli miktarda 💎'ın bulunmuyor :/").setColor("RED") ]});
        if(card['ID'] == message.author.id) return message.reply({ embeds: [Embed.setDescription("Başarıyla kendine `" + amount + "` 💎 gönderdin.").setColor("GREEN") ]});
    
        database.subtract(`${message.author.id}.coin`, amount); 
        database.add(`${card['ID']}.coin`, amount); 
        message.reply({
            embeds: [Embed.setDescription("Başarıyla `" + abbrev(amount) + "` 💎'ı <@"+card['ID']+"> kişisine gönderdiniz.").setColor("GREEN")]
        })
    }
}