const Discord = require("discord.js");
const { Client, Util } = require("discord.js");
const { prefix } = require("./config");
const client = new Client({
  messageCacheMaxSize: Infinity,
  messageCacheLifetime: 540,
  messageSweepInterval: 180,
  fetchAllMembers: true,
  disableMentions: "everyone",
});
const fs = require("fs");
const config = require("./config.json");
const disbut = require("discord-buttons");
disbut(client);
const lineReader = require("line-reader");
const db = require("quick.db");
const { WebhookClient } = require("discord.js");
const welcomeHook = new WebhookClient(
  "954181221800374282",
  "uMTA4hjNA9zItLJ95D-fveOtyLu5qnPCY8BAUenqmq_Of8ufuDAw8zhodvfCHakeg8MV"
);
const bot = client;
const { KeyMongo } = require("key-mongo");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.db = require("quick.db");
client.config = require("./config.json");
client.mongo = new KeyMongo({
  dbName: "data",
  dbUrl:
    "mongodb+srv://secretDevelopment17:secretdev170720@core-database.quzlg.mongodb.net/data",
});
client.cases = Math.random(1000).toString(36).substr(2, 8);
client.request = require("petitio")

const { GiveawaysManager } = require("discord-giveaways");
if (!db.get("giveaways")) db.set("giveaways", []);

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
  // This function is called when the manager needs to get all the giveaway stored in the database.
  async getAllGiveaways() {
    // Get all the giveaway in the database
    return db.get("giveaways");
  }

  // This function is called when a giveaway needs to be saved in the database (when a giveaway is created or when a giveaway is edited).
  async saveGiveaway(messageID, giveawayData) {
    // Add the new one
    db.push("giveaways", giveawayData);
    // Don't forget to return something!
    return true;
  }

  async editGiveaway(messageID, giveawayData) {
    // Gets all the current giveaways
    const giveaways = db.get("giveaways");
    // Remove the old giveaway from the current giveaways ID
    const newGiveawaysArray = giveaways.filter(
      (giveaway) => giveaway.messageID !== messageID
    );
    // Push the new giveaway to the array
    newGiveawaysArray.push(giveawayData);
    // Save the updated array
    db.set("giveaways", newGiveawaysArray);
    // Don't forget to return something!
    return true;
  }

  // This function is called when a giveaway needs to be deleted from the database.
  async deleteGiveaway(messageID) {
    // Remove the giveaway from the array
    const newGiveawaysArray = db
      .get("giveaways")
      .filter((giveaway) => giveaway.messageID !== messageID);
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
    exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
    embedColor: "#FF0000",
    reaction: "🎉",
  },
});
client.giveawaysManager = manager;
// We now have a client.giveawaysManager property to manage our giveaways!

client.giveawaysManager.on(
  "giveawayReactionAdded",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`
    );
  }
);

client.giveawaysManager.on(
  "giveawayReactionRemoved",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`
    );
  }
);

fs.readdir("./cmds/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter((f) => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("couldn't find command");
    return;
  }

  jsfile.forEach((f, i) => {
    let pull = require(`./cmds/${f}`);
    console.log(`Loaded ${f} commands`);
    client.commands.set(pull.help.name, pull);
    pull.help.aliases.forEach((alias) => {
      client.aliases.set(alias, pull.help.name);
    });
  });
});

client.on("ready", () => {
  console.log(
    `${client.user.username}#${client.user.discriminator} has been online`
  );

  setInterval(() => {
    const status = [
      `VALORANT`,
      `Counter-Strike: Global Offensive`,
      `Apex Legends`,
      `Fortnite`,
      `PUBG`,
      `Overwatch`,
      `League of Legends`,
      `Minecraft`,   
      `Grand Theft Auto V`   
    ];     
    let random = Math.floor(Math.random() * status.length)
    client.user.setPresence({
      activity: { name: status[random], type: "PLAYING" },
      status: "online",
    });
  }, 60000);
});

client.on("message", async (message) => {
  if (message.author.bot) return undefined;
  let prefix = config.prefix;
  if (!message.content.startsWith(prefix)) return undefined;

  let command = message.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);
  let args = message.content.slice(prefix.length).trim().split(" ");
  let cmd = args.shift().toLowerCase();

  try {
    let commandFile =
      client.commands.get(command) ||
      client.commands.get(client.aliases.get(command));
    commandFile.run(client, message, args);
  } catch (e) {
    console.log(e.message);
  } finally {
    console.log(`${message.author.username} using command ${cmd}`);
  }
});
// 🟨 ===== Member Join ===== 🟨
client.on("guildMemberAdd", async (member) => {
  const ch = client.channels.cache.get("954177761868664863");
  const welcomer = [
    `${member.user} just landed 🚀`,
    `Glad you're here, ${member.user} 👋`,
    `${member.user}  joined the party 🥂`,
    `Everyone welcome ${member.user}! 😉`,
    `Welcome, ${member.user} don't forget to bring your coffe ☕`,
    `Good to see you, ${member.user} 😃`,
  ];
  let random = Math.floor(Math.random() * welcomer.length);

  const logsEmbed = new Discord.MessageEmbed()
    .setTitle(`[\`${member.guild.memberCount}\`] Member joined.`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
    .setColor("GREEN")
    .setDescription(
      `\`\`\`asciidoc
				• Username :: ${member.user.username} | #${member.user.discriminator}
				• ID :: ${member.user.id}
				• Created At :: ${new Date(member.user.createdTimestamp).toString()}    
			\`\`\``
    )
    .setFooter(
      `Member joined`,
      `https://cdn.discordapp.com/emojis/574840956444999681.png?v=1`
    )
    .setTimestamp();

  const memberEmbed = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setThumbnail(member.guild.iconURL({ dynamic: true, size: 4096 }))
    .setDescription(
      `
				Greetings, ${member.user}!
				Welcome to **${member.guild.name}**!

				Before you do anything, you have to read the rules that we have provided,
				you are advised to read the **Rules and Information** in the <#954175101371301960> channels.
			`
    )
    .setFooter(`You are now in ${member.guild.memberCount} Members.`);

  const row = new disbut.MessageActionRow().addComponent(
    new disbut.MessageButton()
      .setLabel("Read our rules")
      .setStyle("url")
      .setURL(
        "https://discord.com/channels/954173179042091028/954175757259788328"
      )
  );

  const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`<a:Join:593588419087695872> | ${welcomer[random]}`);

  client.channels.cache.get("954176559332327494").send(logsEmbed);
  ch.setName(`Total Member : ${member.guild.memberCount}`);
  welcomeHook.send(embed);
  member.send({ embed: memberEmbed, components: [row] });
  member.roles.add("954181940381098014");
  if ((await bot.mongo.has("isMuted", member.id))) return member.roles.add("954378331401367572").then(() => client.channels.cache.get("954396398617501726").send(new Discord.MessageEmbed().setDescription(`<:Error:575148612166746112> | ${member.user} was trying to enter the server, but I've handled them (\`MUTED\`)`).setColor("RED")));
  if ((await bot.mongo.has("isJail", member.id))) return member.roles.add("956904276335144970").then(() => client.channels.cache.get("954396398617501726").send(new Discord.MessageEmbed().setDescription(`<:Error:575148612166746112> | ${member.user} was trying to enter the server, but I've handled them (\`PRISON\`)`).setColor("RED")));     
});

// 🟨 ===== Member Leave ===== 🟨
client.on("guildMemberRemove", async (member) => {
  const ch = client.channels.cache.get("954177761868664863");
  const leaved = [
    `**${member.user.tag}** just left our server 😔`,
    `We are sad to see you leave the server **${member.user.tag}** 😭`,
    `Goodbye **${member.user.tag}**, we are always waiting for you to come back 😊`,
    `It seems that from now on **${member.user.tag}** has left our server 🛫`,
    `**${member.user.tag}** just left the server 👋`,
    `I seem to sense that **${member.user.tag}** has left this server 🤧`,
  ];
  let random = Math.floor(Math.random() * leaved.length);

  const logsEmbed = new Discord.MessageEmbed()
    .setTitle(`[\`${member.guild.memberCount}\`] Member leaved.`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
    .setColor("RED")
    .setDescription(
      `\`\`\`asciidoc
				• Username :: ${member.user.username} | #${member.user.discriminator}
				• ID :: ${member.user.id}
				• Created At :: ${new Date(member.user.createdTimestamp).toString()}    
			\`\`\``
    )
    .setFooter(
      `Member leaved`,
      `https://cdn.discordapp.com/emojis/574840995246768149.png?v=1`
    )
    .setTimestamp();

  const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`<a:Leave:593588489342156810> | ${leaved[random]}`);

  client.channels.cache.get("954176559332327494").send(logsEmbed);
  ch.setName(`Total Member : ${member.guild.memberCount}`);
  welcomeHook.send(embed);
});

// 🟨 ===== MESSAGE DELETE LOGS ===== 🟨
client.on("messageDelete", async (message) => {
  if (!message.guild || message.author.bot) return;
  const attachments =
    message.attachments.size !== 0
      ? message.attachments.map((attachment) => attachment.proxyURL)
      : null;
  const embed = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setAuthor(
      `New Message Deleted`,
      `https://cdn.discordapp.com/emojis/737554516999929867.gif?size=32&quality=lossless`
    )
    .setDescription([
      `> Message ID: \`${message.id}\``,
      `> Channel: ${message.channel}`,
      `> Author: <@!${message.member.id}> | \`${message.member.id}\``,
      //`${attachments ? `**❯ Attachments:** ${attachments.join('\n')}` : '\u200B'}`
    ])
    .setTimestamp();
  if (message.content.length) {
    embed.addField(
      `> Content:`,
      `\`\`\`${
        message.content !== undefined
          ? message.content
          : "This message is not have any content"
      }\`\`\``
    );
  }
  if (attachments) {
    embed.setImage(attachments[0]);
  }

  const channel = message.guild.channels.cache.find(
    (ch) => ch.name === "🚫┇automod"
  );
  if (channel) channel.send(embed);
});

// 🟨 ===== MESSAGE UPDATE LOGS ===== 🟨
client.on("messageUpdate", async (old, message) => {
  if (!message.guild || old.content === message.content || message.author.bot)
    return;

  const embed = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setAuthor(
      `New Message Update`,
      `https://cdn.discordapp.com/emojis/737554516999929867.gif?size=32&quality=lossless`,
      old.url
    )
    .setDescription([
      `> Message ID: \`${old.id}\``,
      `> Channel: ${old.channel}`,
      `> Author: <@!${old.author.id}> | \`${old.author.id}\``,
    ])
    .addField("> Before:", `\`\`\`${old.content}\`\`\``)
    .addField("> After:", `\`\`\`${message.content}\`\`\``)
    .setTimestamp();

  const channel = message.guild.channels.cache.find(
    (ch) => ch.name === "🚫┇automod"
  );
  if (channel) channel.send(embed);
});

// 🟨 ===== DANGEROUS LINK DETECTOR ===== 🟨
client.on("message", async (message) => {
  var j = 0;
  function isValidURL(string) {
    const res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  }
  if (isValidURL(message.content.toLowerCase()) == true) {
    var a = message.id;

    lineReader.eachLine("dangurls.txt", (line, last) => {
      if (
        message.content.toLowerCase().startsWith("https://www." + line) ||
        message.content.toLowerCase().startsWith("http://www." + line) ||
        message.content.toLowerCase().startsWith(line) ||
        message.content.toLowerCase().startsWith("http://" + line) ||
        message.content.toLowerCase().startsWith("https://" + line)
      ) {
        message.channel.messages
          .fetch(a)
          .then((msg) => msg.delete({ timeout: 1000 }));

        let links = new Discord.MessageEmbed()
          .setColor("#E7A700")
          .setTitle(`⚠ Malicious link detected ⚠`)
          .setFooter(
            "The link sent may be a malicious link. I will try to prevent, don't try to open it"
          );

        const author = `${client.user}`;
        const reason = `Posted malicious link detected`;
        let member = message.author;
        let logsLink = new Discord.MessageEmbed()
          .setColor("RED")
          .setAuthor(
            `Auto-Muted | Case ${client.cases}`,
            `https://cdn.discordapp.com/emojis/742191092652310578.png?v=1`
          )
          .setThumbnail(
            `${message.author.displayAvatarURL({ dynamic: true, size: 4096 })}`
          )
          .addField("**Muted User**", `${member} | \`${member.id}\``)
          .addField("**Moderator**", `${author}`)
          .addField("**Reason**", `\`\`\`\n${reason}\n\`\`\``)
          .addField(
            "**Timestamp**",
            `**\`\`\`css\n${new Date(
              message.createdTimestamp
            ).toString()}\n\`\`\`**`
          )
          .setTimestamp();

        const userEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${message.guild.name} Auto-Muted | Case ${client.cases}`,
            message.guild.iconURL()
          )
          .setColor("#2f3136")
          .setDescription(
            `You has been auto-muted on **${message.guild.name}**`
          )
          .addField("Reason", `\`\`\`${reason}\`\`\``)
          .addField("Moderator", `${author}`)
          .setFooter(`If this is a mistake, please DM our staff`)
          .setTimestamp();

        const embed = new Discord.MessageEmbed()
          .setColor("#2f3136")
          .setAuthor(
            `Malicious link detected`,
            `https://cdn.discordapp.com/emojis/590433107111313410.gif`
          )
          .setDescription([			  		
			`> Message ID: \`${message.id}\``,
			`> Channel: ${message.channel}`,
            `> Author: ${member} | \`${member.id}\``,			
          ])
          .addField("> Content:", `|| ${message.content} ||`)
		  .setFooter(`Don't try to open it`)
          .setTimestamp();


        const channel = message.guild.channels.cache.find(
          (ch) => ch.name === "🚫┇automod"
        );
        if (channel) channel.send(embed);
        message.member.roles.add("954378331401367572");
        client.users.cache.get(member.id).send(userEmbed);
		    bot.mongo.set(`isMuted`, member.id, true);
        bot.channels.cache.get(bot.config.modsChannel).send(logsLink);
        bot.mongo.set("case", bot.cases, {
          user: member.id,
          tag: member.tag,
          type: "Auto-Mute",
          moderator: author.id,
          reason: reason,
        });
        message.channel
          .send(`${message.author}`)
          .then(() => message.channel.send(links))
          .catch((err) => {
            message.reply("An error occured");
          });
        j++;
        return false;
      }
    });
  }
  if (j > 0) {
    const nvt = require("node-virustotal");
    const defaultTimedInstance = nvt.makeAPI();
    const theSameObject = defaultTimedInstance.domainLookup(
      message.content.toLowerCase(),
      function (err, res) {
        if (err) {
          console.log("Virustotal API did not work because:");
          console.log(err);
          return;
        }
        var road = JSON.parse(res);
        if (
          road.data.attributes.last_analysis_results.Kaspersky.result != "clean"
        ) {
          let links = new Discord.MessageEmbed()
            .setColor("#E7A700")
            .setTitle(
              `⚠ This link is ${road.data.attributes.last_analysis_results.Kaspersky.result.toUpperCase()} ⚠`
            )
            .setFooter(
              "The link sent may be a malicious link. I will try to prevent, don't try to open it"
            );

          const author = `${client.user.id}`;
          const reason = `Posted malicious link detected`;
          let member = message.author;
          let logsLink = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(
              `Auto-Muted | Case ${client.cases}`,
              `https://cdn.discordapp.com/emojis/742191092652310578.png?v=1`
            )
            .setThumbnail(
              `${message.author.displayAvatarURL({
                dynamic: true,
                size: 4096,
              })}`
            )
            .addField("**Muted User**", `${member} | \`${member.id}\``)
            .addField("**Moderator**", `${author}`)
            .addField("**Reason**", `\`\`\`\n${reason}\n\`\`\``)
            .addField(
              "**Timestamp**",
              `**\`\`\`css\n${new Date(
                message.createdTimestamp
              ).toString()}\n\`\`\`**`
            )
            .setTimestamp();

          const userEmbed = new Discord.MessageEmbed()
            .setAuthor(
              `${message.guild.name} Auto-Muted | Case ${client.cases}`,
              message.guild.iconURL()
            )
            .setColor("#2f3136")
            .setDescription(
              `You has been auto-muted on **${message.guild.name}**`
            )
            .addField("Reason", `\`\`\`${reason}\`\`\``)
            .addField("Moderator", `${author}`)
            .setFooter(`If this is a mistake, please DM our staff`)
            .setTimestamp();

			const embed = new Discord.MessageEmbed()
			.setColor("#2f3136")
			.setAuthor(
			  `Malicious link detected`,
			  `https://cdn.discordapp.com/emojis/590433107111313410.gif`
			)
			.setDescription([			  		
			  `> Message ID: \`${message.id}\``,
			  `> Channel: ${message.channel}`,
			  `> Author: ${member} | \`${member.id}\``,			
			])
			.addField("> Content:", `|| ${message.content} ||`)
			.setFooter(`Don't try to open it`)
			.setTimestamp();
  
  
		  const channel = message.guild.channels.cache.find(
			(ch) => ch.name === "🚫┇automod"
		  );
		  if (channel) channel.send(embed);	
          message.member.roles.add("954378331401367572");
          client.users.cache.get(member.id).send(userEmbed);
		  bot.mongo.set(`isMuted`, member.id, true);
          bot.channels.cache.get(bot.config.modsChannel).send(logsLink);
          bot.mongo.set("case", bot.cases, {
            user: member.id,
            tag: member.tag,
            type: "Auto-Mute",
            moderator: author,
            reason: reason,
          });
          message.channel
            .send(`${message.author}`)
            .then(() => message.channel.send(links))
            .catch((err) => {
              message.reply("An error occured");
            });
        }
      }
    );
  }
});

  // 🟨 ===== Auto Voice Channels ===== 🟨
  client.on('voiceStateUpdate', (oldState, newState) => {
    // Only watch user moves
    if (oldState.channelID === newState.channelID) return

    const member = newState.member

    // Fetch Voice Category
    const addCategory = newState.guild.channels.cache.find(channel => channel.name == "《 VOICE CHANNELS 》" && channel.type === "category")

    // Fetch Create Channel channel
    const addChannel = newState.guild.channels.cache.find(channel => channel.name == "➕┇Create Voice" && channel.type === "voice")

    // Does it exist?
    if (!addChannel) return console.error('No creation channel found')
    if (!addCategory) return console.error('No creation category found')

    // Create new channel
    if (newState.channel == addChannel) {
        addChannel.guild.channels.create(member.user.username.toLowerCase(), {
            type: 'voice',
            parent: addCategory.id,
            permissionOverwrites: [{
                id: member.id,
                allow: ['MANAGE_CHANNELS', 'MANAGE_ROLES']
            }]
        }).then(channel => {
            if (config.highBitrateGuilds.includes(channel.guild.id)) channel.setBitrate(96000)
            newState.setChannel(channel)
            addChannel.guild.channels.create(member.user.username.toLowerCase(), {
                type: 'text',
                parent: addCategory.id,
                permissionOverwrites: [{
                    id: member.id,
                    allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'MANAGE_ROLES']
                }, {
                    id: addChannel.guild.id,
                    deny: ['VIEW_CHANNEL']
                }, {
                    id: client.user.id,
                    allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'MANAGE_ROLES']
                }]
            }).then(c => {
                textIDs.set(channel.id, c.id)
            })
        }).catch(console.error)
    }

    if (oldState.channel && oldState.channel !== addChannel && oldState.channel.parentID == addCategory.id && oldState.channel.members.size > 0) {
        const txtID = textIDs.get(oldState.channel.id)
        if (!txtID) return
        const txtChannel = oldState.guild.channels.cache.get(txtID)
        if (!txtChannel) return
        let overWrites = txtChannel.permissionOverwrites.array()
        overWrites = overWrites.filter(oW => oW.id !== member.id)
        txtChannel.overwritePermissions(overWrites)
    }

    if (newState.channel && newState.channel !== addChannel && newState.channel.parentID == addCategory.id) {
        const txtID = textIDs.get(newState.channel.id)
        if (txtID) {
            const txtChannel = newState.guild.channels.cache.get(txtID)
            let overWrites = txtChannel.permissionOverwrites.array()
            let personalOverwrites = overWrites.find(oW => overWrites.id === member.id)
            if (personalOverwrites) delete personalOverwrites
            overWrites.push({
                id: member.id,
                allow: ['VIEW_CHANNEL']
            })
            txtChannel.overwritePermissions(overWrites)
        }
    }

    // Don't delete add channel
    if (!oldState.channel || oldState.channel === addChannel) return

    // Remove empty channels
    if (oldState.channel.parent && oldState.channel.parent === addCategory && oldState.channel.members && oldState.channel.members.size === 0) {
        const textChannel = oldState.guild.channels.cache.get(textIDs.get(oldState.channel.id))
        if (textChannel) textChannel.delete().catch(console.error)
        oldState.channel.delete().catch(console.error)
        textIDs.delete(oldState.channel.id)
        return
    }

    if (oldState.channel.parent && oldState.channel.parent === addCategory && oldState.channel.members && oldState.channel.members.size > 0 && oldState.channel.name === member.user.username) {
        const newOwner = oldState.channel.members.random()
        oldState.channel.edit({
            name: newOwner.user.username,
            type: 'voice',
            parent: addCategory.id,
            permissionOverwrites: [{
                id: newOwner.id,
                allow: ['MANAGE_CHANNELS', 'MANAGE_ROLES']
            }]
        }).catch(console.error)

        const txtID = textIDs.get(oldState.channel.id)
        if (!txtID) return
        const txtChannel = oldState.guild.channels.cache.get(txtID)
        let overWrites = txtChannel.permissionOverwrites.array()
        let personalOverwrites = overWrites.find(oW => overWrites.id === member.id)
        if (personalOverwrites) delete personalOverwrites
        overWrites.push({
            id: newOwner.id,
            allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS', 'MANAGE_ROLES']
        }, {
            id: client.user.id,
            allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'MANAGE_ROLES']
        })
        txtChannel.edit({
            name: newOwner.user.username.toLowerCase(),
            type: 'text',
            parent: addCategory.id,
            permissionOverwrites: overWrites
        })
    }
    // ToDo 
    // ???
})

client.login(config.token);

const http = require("http");
const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", function (request, response) {
  response.sendStatus(200);
});

app.set("trust proxy", true);
app.use((req, res, next) => {
  if (!req.secure) return res.redirect("https://" + req.get("host") + req.url);
  next();
});

app.get("/case", async function (req, res) {
  const data = await client.mongo.list("case");
  res.send(data);
});

app.get("/ismuted", async function (req, res) {
	const data = await client.mongo.list("isMuted");
	res.send(data);
});

app.get("/tag", async function (req, res) {
  const data = await client.mongo.list("tag");
  res.send(data);
});

app.set("json spaces", 2);
app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
