const { Client, Message } = require("discord.js");

module.exports = {
    event: "ready",
    /**
     * 
     * @param {Client} client 
     */
    run: async(client) => {
        console.log(client.user.tag + " adına giriş yaptım.")        
    }
}