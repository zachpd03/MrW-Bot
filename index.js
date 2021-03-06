const botconfig = require("./botconfig.js");
const Discord = require("discord.js");
const fs = require("fs");
const pg = require("pg");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if(jsfile.length <= 0){
		console.log("Couldn't find commands.");
		return;
	}
	jsfile.forEach((f,i) =>{
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

bot.on("ready", async () => {
	console.log(`${bot.user.username} is online!`);
	bot.user.setActivity("Games", {type: "PLAYING"});
});
bot.on("message", async message => {
	if(message.channel.type === "dm") return;
	if((message.content.endsWith("messages that were not over two weeks old!")) && (message.author.bot)) {
		message.delete(5000)
		}
	if((message.content.endsWith("just talk again!")) && (message.author.bot)) {
		message.delete(5000)
	}
	if((message.content.endsWith("Your AFK status was removed.")) && (message.author.bot)) {
		message.delete(5000)
	}
	if((message.content.includes("This user is currently AFK!")) && (message.author.bot)) {
		message.delete(5000)
	}
	if(message.author.bot === false) {
		let channel = bot.channels.find(`id`, "422201325623836682")
		let messages = await channel.fetchMessages({limit: 100})
		let array = messages.filter(m => RegExp(message.author.id, "gi").test(m.content));
		let first = array.first()
		if(first) {
		first.delete()
		message.reply("Welcome back! Your AFK status was removed.")
		}
	}
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0].toLowerCase();
	let args = messageArray.slice(1);
	if(message.author.bot === false) {
		let mentions = message.mentions.members.first()
		if(mentions) {
		let channel = bot.channels.find(`id`, `422201325623836682`)
		let messages = await channel.fetchMessages({limit: 100})
		let array = messages.filter(m => RegExp(mentions.id, "gi").test(m.content));
		let first = array.first()
		if(first) {
		let afkmsg = first.content.substr(mentions.id.length)
		message.reply(`This user is currently AFK!\nAFK Message: \`${afkmsg}\``)
		}
		}
	}
	
	
	
	
	let prefix = botconfig.prefix;
	
	if(!message.content.startsWith(botconfig.prefix)) return;
	let commandfile = bot.commands.get(cmd.slice(prefix.length));
	return commandfile.run(bot, message, args);
})
bot.login(botconfig.token);
