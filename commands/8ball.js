const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  var responses = ["no.","highly unlikely.","very doubtful.","you wish.","don't count on it", "probably.", "most definitely", "yes.", "highly likely.", "of course.",
                  "ask again later.", "outlook not so good, retry.", "ask again later."];
  var randomchoice = Math.floor(Math.random() * choices.length);
  message.reply("The 8ball says..."+responses[randomchoice]);
}
module.exports.help = {
  name: "8ball";
}
