const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let muteRole = message.guild.roles.cache.find(r => r.name === "Muted")
    let muted = await db.fetch(`isMuted.${user.id}`)
    if (!muted) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:890560104603189288> | Sorry, but <@${user.id}> is not muted.`).setColor("RED"))
    if (!muteRole) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:890560104603189288> | I can't find \`Muted\` role in this guild`).setColor("RED"))
    
    let embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setAuthor(`Unmuted User`, `https://cdn.discordapp.com/emojis/742191092652310578.png?v=1`)
    .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true, size: 4096 })}`)
    .addField("**Warned User**", `${member} | \`${member.id}\``)
    .addField("**Moderator**", `${author} | \`${author.id}\``)
    .addField("**Reason**", `\`\`\`\n${reason}\n\`\`\``)
    .addField("**Timestamp**", `**\`\`\`css\n${new Date(message.createdTimestamp).toString()}\n\`\`\`**`)
    .setTimestamp();

    user.roles.remove(muteRole)
    client.channels.cache.get(client.config.modsChannel).send(embed)
    bot.mongo.delete(`isMuted`, user.user.id);
    message.channel.send(new Discord.MessageEmbed().setDescription(`<a:yes:890559630525202432> | <@${user.id}> has been unmuted.`).setColor("GREEN"))
    
  }
  
  exports.help = {
    name: "unmute",
    aliases: []
  }