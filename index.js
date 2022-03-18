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
            activity: { name: "in AthX", type: "PLAYING" },
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

  client.on("messageDelete", async (message) => {
	if (!message.guild || message.author.bot) return;
		  const attachments = message.attachments.size !== 0 ? message.attachments.map(attachment => attachment.proxyURL) : null;
		  const embed = new Discord.MessageEmbed()
			  .setColor('BLUE')
			  .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			  .setTitle('Message Deleted')
			  .setDescription([
				  `**❯ Message ID:** \`${message.id}\``,
				  `**❯ Channel:** ${message.channel}`,
				  `**❯ Author:** ${message.member.displayName}`,
				  `${attachments ? `**❯ Attachments:** ${attachments.join('\n')}` : '\u200B'}`
			  ]);
		  if (message.content.length) {
			  embed.addField(`**❯ Deleted Message:**`, `\`\`\`${message.content !== undefined ? message.content : "This message is not have any content"}\`\`\``);
		  }
  
		  const channel = message.guild.channels.cache.find(ch => ch.name === '🚫┇automod');
		  if (channel) channel.send(embed);
	  
  });
  
  
  client.on('messageUpdate', async (old, message) => {
	if (!message.guild || old.content === message.content || message.author.bot) return;
  
		  const embed = new Discord.MessageEmbed()
			  .setColor('BLUE')
			  .setAuthor(old.author.tag, client.user.displayAvatarURL({ dynamic: true }))
			  .setTitle('Message Updated')
			  .setDescription([
				  `**❯ Message ID:** ${old.id}`,
				  `**❯ Channel:** ${old.channel}`,
				  `**❯ Author:** ${old.author.tag} (${old.author.id})`
			  ])
			  .setURL(old.url)
		.addField("**❯ Before:**", `\`\`\`${old.content}\`\`\``)
		.addField("**❯ After:**", `\`\`\`${message.content}\`\`\``)  
  
		  const channel = message.guild.channels.cache.find(ch => ch.name === '🚫┇automod');
		  if (channel) channel.send(embed);
	  
  })


client.login(config.token);
