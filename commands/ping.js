const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    return message.reply(`Pong! \`${Math.round(bot.ping)}\``);
}

module.exports.help = {
    name: "ping"
}
