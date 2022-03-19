const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!user) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | You need to specify a user to unmute.`).setColor("RED"))
    let muteRole = message.guild.roles.cache.find(r => r.name === "Muted")
    let muted = await client.mongo.get(`isMuted`, user.id)
    if (!muted) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | Sorry, but <@${user.id}> is not muted.`).setColor("RED"))
    if (!muteRole) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | I can't find \`Muted\` role in this guild`).setColor("RED"))
    
    let embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setAuthor(`Unmuted User`, `https://cdn.discordapp.com/emojis/742191092652310578.png?v=1`)
    .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true, size: 4096 })}`)
    .addField("**Unmuted User**", `${user} | \`${user.id}\``)
    .addField("**Moderator**", `${author} | \`${author.id}\``)
    .addField("**Timestamp**", `**\`\`\`css\n${new Date(message.createdTimestamp).toString()}\n\`\`\`**`)
    .setTimestamp();

    user.roles.remove(muteRole)
    client.channels.cache.get(client.config.modsChannel).send(embed)
    bot.mongo.delete(`isMuted`, user.id);
    message.channel.send(new Discord.MessageEmbed().setDescription(`<a:yes:954773528153059350> | <@${user.id}> has been unmuted.`).setColor("GREEN"))
    
  }
  
  exports.help = {
    name: "unmute",
    aliases: []
  }