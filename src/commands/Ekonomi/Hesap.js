const { Client, Message, MessageEmbed, MessageAttachment } = require("discord.js");
const { Database } = require("../../structures/Database");
const { createCanvas, loadImage, Image } = require('canvas');
const { readFile, readFileSync } = require("fs");
const abbrev = require("../../structures/abbrev");

module.exports = {
    name: "Hesap",
    aliases: ["Account", "Acc"],
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
            title: "Hesap",
            author: {
                icon_url: message.author.displayAvatarURL(),
                name: message.author.tag
            },
            footer: {
                text: "Powered by zRooter#7295"
            }
        });


        if(["oluştur", "create"].includes(args[0]?.toLowerCase())) {
            if(database.fetch(`${message.author.id}`) != null) return message.reply({
                embeds: [
                    Embed.setDescription("Zaten bir Hesabın var! `!hesap`").setColor("RED")
                ]
            });
            let date = new Date();
            database.set(`${message.author.id}`, {
                coin: 10,
                level: 0,
                xp: 0,
                card_no: `${date.getTime()}${Math.floor(Math.random() * 999)}`
            });
            message.reply({
                embeds: [
                    Embed.setDescription("Hesabın başarıyla oluşturuldu hesabına göz atmak için `!hesap` komutunu giriniz.").setColor("GREEN")
                ]
            });
        } else if(["sorgu", "whois"].includes(args[0]?.toLowerCase())) {
            let user = message.mentions.users.first() || message.author;
            if(database.fetch(`${user.id}`) == null) return message.reply({
                embeds: [
                    Embed.setDescription(`${user.id == message.author.id ? "Lütfen bir hesap oluşturunuz! `!hesap oluştur`" : "Kullanıcının bir hesabı yok önce bir hesap oluşturmalı."}`).setColor("RED")
                ]
            });

            message.reply({
                embeds: [
                    Embed.setDescription(`${user != message.author ? `${user}'ın hesap bilgileri aşağıda` : `Hesap bilgilerin aşağıda`}`).setFields([
                        {
                            name: "💎 Coin",
                            value: `${database.fetch(`${user.id}.coin`)}`,
                            inline: true
                        },
                        {
                            name: "💳 Kart No.:",
                            value: `${database.fetch(`${user.id}.card_no`)}`,
                            inline: true
                        },
                        {
                            name: "💠 Seviye",
                            value: `${database.fetch(`${user.id}.level`)} Lv.`,
                            inline: true
                        },
                        {
                            name: "💠 XP",
                            value: `${database.fetch(`${user.id}.level`)} XP`,
                            inline: true
                        },
                    ]).setColor("GREEN")
                ]
            })
        } else {
            let user = message.mentions.users.first() || message.author;
            if(database.fetch(`${user.id}`) == null) return message.reply({
                embeds: [
                    Embed.setDescription(`${user.id == message.author.id ? "Lütfen bir hesap oluşturunuz! `!hesap oluştur`" : "Kullanıcının bir hesabı yok önce bir hesap oluşturmalı."}`).setColor("RED")
                ]
            });
            let background = new Image();
            background.src = './assets/kart.png';
            const canvas = createCanvas(background.width, background.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(background, 0, 0, background.width, background.height);
            let userDb = database.fetch(`${user.id}`);
            // Text
            ctx.font = "bold "+ (90 - user.tag.split("").length) +"px sans-serif"
            ctx.textAlign = "center";
            ctx.fillText(`${user.tag}`, background.width / 2, background.height / 2 - 100);

            ctx.font = "bold 50px sans-serif"
            ctx.textAlign = "center";
            ctx.fillText(`${Number(userDb.card_no).toLocaleString().replaceAll(".", " ")}`, background.width / 2, background.height / 2);
            
            ctx.font = "bold 50px sans-serif"
            ctx.textAlign = "center";
            ctx.fillText(`💎 ${abbrev(Number(userDb.coin))}`, background.width / 2 - 300, background.height - 100);

            ctx.font = "bold 50px sans-serif"
            ctx.textAlign = "center";
            ctx.fillText(`${Number(userDb.level)} Lv.`, background.width / 2, background.height - 100);
            ctx.fillText(`${abbrev(Number(userDb.xp))} XP`, background.width / 2 + 300, background.height - 100);
            // Avatar
            
            let avatar = await loadImage(user.displayAvatarURL({ format: "png", size: 300 }));
      
            ctx.beginPath();
            ctx.arc(70 * 3, 70 * 11.2, 170, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.clip();
            ctx.drawImage(avatar, 10 * 4, 70 * 8.8, 340, 340);
            ctx.restore();


            let buffer = canvas.toBuffer('image/png');

            let attachment = new MessageAttachment(buffer, 'kart-'+user.id+'.png');

            message.reply({
                files: [attachment]
            });
        }

    }
}