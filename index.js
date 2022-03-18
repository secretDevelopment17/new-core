const Discord = require("discord.js");
const { Client, Util } = require('discord.js');
const { prefix } = require('./config');
const client = new Client({
	messageCacheMaxSize: Infinity,
	messageCacheLifetime: 540,
	messageSweepInterval: 180,
	fetchAllMembers: true,
	disableMentions: 'everyone'
});
const fs = require("fs")
const config = require("./config.json");
const disbut = require('discord-buttons');
disbut(client)
const lineReader = require('line-reader');
const db = require("quick.db")
const { WebhookClient } = require("discord.js");
const welcomeHook = new WebhookClient("954181221800374282", "uMTA4hjNA9zItLJ95D-fveOtyLu5qnPCY8BAUenqmq_Of8ufuDAw8zhodvfCHakeg8MV");

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.db = require("quick.db")
client.config = require("./config.json")

const { GiveawaysManager } = require("discord-giveaways");
const db = require("quick.db");
if(!db.get("giveaways")) db.set("giveaways", []);

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {

    // This function is called when the manager needs to get all the giveaway stored in the database.
    async getAllGiveaways(){
        // Get all the giveaway in the database
        return db.get("giveaways");
    }

    // This function is called when a giveaway needs to be saved in the database (when a giveaway is created or when a giveaway is edited).
    async saveGiveaway(messageID, giveawayData){
        // Add the new one
        db.push("giveaways", giveawayData);
        // Don't forget to return something!
        return true;
    }

    async editGiveaway(messageID, giveawayData){
        // Gets all the current giveaways
        const giveaways = db.get("giveaways");
        // Remove the old giveaway from the current giveaways ID
        const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
        // Push the new giveaway to the array
        newGiveawaysArray.push(giveawayData);
        // Save the updated array
        db.set("giveaways", newGiveawaysArray);
        // Don't forget to return something!
        return true;
    }

    // This function is called when a giveaway needs to be deleted from the database.
    async deleteGiveaway(messageID){
        // Remove the giveaway from the array
        const newGiveawaysArray = db.get("giveaways").filter((giveaway) => giveaway.messageID !== messageID);
        // Save the updated array
        db.set("giveaways", newGiveawaysArray);
        // Don't forget to return something!
        return true;
    }

};

// Create a new instance of your new class
const manager = new GiveawayManagerWithOwnDatabase(client, {
    storage: false,
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
client.giveawaysManager = manager;
// We now have a client.giveawaysManager property to manage our giveaways!

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

fs.readdir("./cmds/", (err, files) => {
    if (err) console.log(err);
  
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
      console.log("couldn't find command");
      return;
    }
  
    jsfile.forEach((f, i) => {
      let pull = require(`./cmds/${f}`);
      console.log(`Loaded ${f} commands`);
      client.commands.set(pull.help.name, pull);
      pull.help.aliases.forEach(alias => {
        client.aliases.set(alias, pull.help.name);
      });
    });
  });

client.on("ready", () => {
  console.log(`${client.user.username}#${client.user.discriminator} has been online`)
  
  setInterval(() => {
    client.user.setPresence({
            activity: { name: "VALORANT", type: "PLAYING" },
            status: "online"
          });;
  }, 5000);
})
  
client.on('message', async message => { 
	if (message.author.bot) return undefined;
	let prefix = config.prefix;
	if (!message.content.startsWith(prefix)) return undefined;

	let command = message.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length);
	let args = message.content.slice(prefix.length).trim().split(" ");
	let cmd = args.shift().toLowerCase();
	
	try {
		let commandFile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
		commandFile.run(client, message, args);
	} catch (e) {
		console.log(e.message)
	} finally {
		console.log(`${message.author.username} using command ${cmd}`);
	}
})

client.on("guildMemberAdd", async (member) => {
    const ch = client.channels.cache.get("954177761868664863")
	const welcomer = [
		`${member.user} just landed 🚀`,
		`Glad you're here, ${member.user} 👋`,
		`${member.user}  joined the party 🥂`,
		`Everyone welcome ${member.user}! 😉`,
		`Welcome, ${member.user} don't forget to bring your coffe ☕`,
		`Good to see you, ${member.user} 😃`
	  ];
	  let random = Math.floor(Math.random() * welcomer.length)  

	  const logsEmbed = new Discord.MessageEmbed()
	  .setTitle(`[\`${member.guild.memberCount}\`] Member joined.`)
	  .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
	  .setColor("GREEN")
	  .setDescription(`\`\`\`asciidoc
• Username :: ${member.user.username} | #${member.user.discriminator}
• ID :: ${member.user.id}
• Created At :: ${new Date(member.user.createdTimestamp).toString()}    
	  \`\`\``)
	  .setFooter(`Member joined`, `https://cdn.discordapp.com/emojis/574840956444999681.png?v=1`)
	  .setTimestamp();

	const memberEmbed = new Discord.MessageEmbed()
	.setColor("#2f3136")
	.setThumbnail(member.guild.iconURL({ dynamic: true, size: 4096 }))
	.setDescription(`
		Greetings, ${member.user}!
		Welcome to **${member.guild.name}**!

		Before you do anything, you have to read the rules that we have provided,
		you are advised to read the **Rules and Information** in the <#954175101371301960> channels.
	`)
	.setFooter(`You are now in ${member.guild.memberCount} Members.`);


	const row = new (disbut.MessageActionRow)().addComponent(
	new (disbut.MessageButton)().setLabel("Read our rules").setStyle("url").setURL('https://discord.com/channels/954173179042091028/954175757259788328'));
	
	const embed = new Discord.MessageEmbed()
	.setColor("GREEN")
	.setDescription(`<a:Join:593588419087695872> | ${welcomer[random]}`)
  
  	client.channels.cache.get("954176559332327494").send(logsEmbed)
  	ch.setName(`Total Member : ${member.guild.memberCount}`)
 	 welcomeHook.send(embed);
  	member.send({ embed: memberEmbed, components: [row] })
  	member.roles.add("954181940381098014")
	if (db.has(`isMuted.${member.user.id}`)) member.roles.add("954378331401367572");
  })

  client.on("guildMemberRemove", async (member) => {
    const ch = client.channels.cache.get("954177761868664863")
	const leaved = [
		`**${member.user.tag}** just left our server 😔`,
		`We are sad to see you leave the server **${member.user.tag}** 😭`,
		`Goodbye **${member.user.tag}**, we are always waiting for you to come back 😊`,
		`It seems that from now on **${member.user.tag}** has left our server 🛫`,
		`**${member.user.tag}** just left the server 👋`,
		`I seem to sense that **${member.user.tag}** has left this server 🤧`
	  ];
	let random = Math.floor(Math.random() * leaved.length) 

    const logsEmbed = new Discord.MessageEmbed()
      .setTitle(`[\`${member.guild.memberCount}\`] Member leaved.`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
      .setColor("RED")
      .setDescription(`\`\`\`asciidoc
• Username :: ${member.user.username} | #${member.user.discriminator}
• ID :: ${member.user.id}
• Created At :: ${new Date(member.user.createdTimestamp).toString()}    
          \`\`\``)
      .setFooter(`Member leaved`, `https://cdn.discordapp.com/emojis/574840995246768149.png?v=1`)
      .setTimestamp();

	const embed = new Discord.MessageEmbed()
	.setColor("RED")
	.setDescription(`<a:Leave:593588489342156810> | ${leaved[random]}`)

	client.channels.cache.get("954176559332327494").send(logsEmbed)
	ch.setName(`Total Member : ${member.guild.memberCount}`)
	welcomeHook.send(embed);
  })

  // ===== MESSAGE DELETE LOGS =====
  client.on("messageDelete", async (message) => {
	if (!message.guild || message.author.bot) return;
		  const attachments = message.attachments.size !== 0 ? message.attachments.map(attachment => attachment.proxyURL) : null;
		  const embed = new Discord.MessageEmbed()
			  .setColor('#2f3136')
			  .setAuthor(`New Message Deleted`, `https://cdn.discordapp.com/emojis/737554516999929867.gif?size=32&quality=lossless`)
			  .setDescription([
				  `> Message ID: \`${message.id}\``,
				  `> Channel: ${message.channel}`,
				  `> Author: <@!${message.member.id}> | \`${message.member.id}\``,
				  //`${attachments ? `**❯ Attachments:** ${attachments.join('\n')}` : '\u200B'}`
			  ])
			  .setTimestamp()
		  if (message.content.length) {
			  embed.addField(`> Content:`, `\`\`\`${message.content !== undefined ? message.content : "This message is not have any content"}\`\`\``);
		  }
		  if (attachments) {
			  embed.setImage(attachments[0]);
		  }
  
		  const channel = message.guild.channels.cache.find(ch => ch.name === '🚫┇automod');
		  if (channel) channel.send(embed);
  });
  
  // ===== MESSAGE UPDATE LOGS =====
  client.on('messageUpdate', async (old, message) => {
	if (!message.guild || old.content === message.content || message.author.bot) return;
  
		  const embed = new Discord.MessageEmbed()
			  .setColor('#2f3136')
			  .setAuthor(`New Message Update`, `https://cdn.discordapp.com/emojis/737554516999929867.gif?size=32&quality=lossless`, old.url)
			  .setDescription([
				  `> Message ID: \`${old.id}\``,
				  `> Channel: ${old.channel}`,
				  `> Author: <@!${old.author.id}> | \`${old.author.id}\``
			  ])
		.addField("> Before:", `\`\`\`${old.content}\`\`\``)
		.addField("> After:", `\`\`\`${message.content}\`\`\``)
		.setTimestamp()  
  
		  const channel = message.guild.channels.cache.find(ch => ch.name === '🚫┇automod');
		  if (channel) channel.send(embed);
  })

  // ===== DANGEROUS LINK DETECTOR =====
  client.on('message', async message => { 
	var j = 0;
	function isValidURL(string) {
		const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
		return (res !== null);
	}
	if (isValidURL(message.content.toLowerCase()) == true) {
		var a = message.id;
		//do not open any link mentioned in the dangurls text file. You have been warned
		lineReader.eachLine('dangurls.txt', (line, last) => {
			if (message.content.toLowerCase().startsWith("https://www." + line) || (message.content.toLowerCase().startsWith("http://www." + line)) || (message.content.toLowerCase().startsWith(line)) || (message.content.toLowerCase().startsWith("http://" + line)) || (message.content.toLowerCase().startsWith("https://" + line))) {
				message.channel.messages.fetch(a).then(msg => msg.delete({ timeout: 1000 }));
				let links = new Discord.MessageEmbed()
					.setColor('#E7A700')
					.setTitle(`⚠ Malicious link detected ⚠`)
					.setFooter("The link sent may be a malicious link. I will try to prevent, don't try to open it");

				message.member.roles.add("954378331401367572")
				db.set(`isMuted.${members.user.id}`, true);
				message.channel.send(`${message.author}`).then(() => message.channel.send(links)).catch(err => {
					message.reply("An error occured");
				});
				j++;
				return false;
			}
		});
	}
	if (j > 0) {
		const nvt = require('node-virustotal');
		const defaultTimedInstance = nvt.makeAPI();
		const theSameObject = defaultTimedInstance.domainLookup(message.content.toLowerCase(), function (err, res) {
			if (err) {
				console.log('Virustotal API did not work because:');
				console.log(err);
				return;
			}
			var road = JSON.parse(res);
			if (road.data.attributes.last_analysis_results.Kaspersky.result != "clean") {
				let links = new Discord.MessageEmbed()
					.setColor('#E7A700')
					.setTitle(`⚠ This link is ${road.data.attributes.last_analysis_results.Kaspersky.result.toUpperCase()} ⚠`)
					.setFooter("The link sent may be a malicious link. I will try to prevent, don't try to open it");

					message.channel.send(`${message.author}`).then(() => message.channel.send(links)).catch(err => {
					return message.reply("An error occured");
				});
			}
		});
	}
})


client.login(config.token);
