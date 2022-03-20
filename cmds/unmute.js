const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!user) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | You need to specify a user to unmute.`).setColor("RED"))
    let muteRole = message.guild.roles.cache.find(r => r.name === "Muted")
    let muted = await client.mongo.get(`isMuted`, user.id)
    if (!muted) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | Sorry, but <@${user.id}> is not muted.`).setColor("RED"))
    if (!muteRole) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | I can't find \`Muted\` role in this guild`).setColor("RED"))
    let reason = args.slice(1).join(" ")
    if (!reason) reason = "No reason specified."

    let embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setAuthor(`Unmuted User`, `https://cdn.discordapp.com/emojis/742191092069433425.png`)
      .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true, size: 4096 })}`)
      .addField("**Unmuted User**", `${user} | \`${user.id}\``)
      .addField("**Moderator**", `${message.author} | \`${message.author.id}\``)
      .addField("**Reason**", `\`\`\`\n${reason}\n\`\`\``)
      .addField("**Timestamp**", `**\`\`\`css\n${new Date(message.createdTimestamp).toString()}\n\`\`\`**`)
      .setTimestamp();

    let userEmbed = new Discord.MessageEmbed()
      .setAuthor(
        `${message.guild.name} Unmuted`,
        message.guild.iconURL()
      )
      .setColor("#2f3136")
      .setDescription(
        `You has been unmuted on **${message.guild.name}**`
      )
      .addField("Reason", `\`\`\`${reason}\`\`\``)
      .addField("Moderator", `${message.author} | \`${message.author.id}\``)
      .setTimestamp();

    user.roles.remove(muteRole)
    user.send(userEmbed)
    client.channels.cache.get(client.config.modsChannel).send(embed)
    client.mongo.delete(`isMuted`, user.id);
    message.channel.send(new Discord.MessageEmbed().setDescription(`<a:yes:954773528153059350> | <@${user.id}> has been unmuted.`).setColor("GREEN"))
    
  }
  
  exports.help = {
    name: "unmute",
    aliases: []
  }