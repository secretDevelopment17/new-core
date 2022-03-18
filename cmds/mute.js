const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let muteRole = message.guild.roles.find(r => r.name === "Muted")
    if (!muteRole) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:890560104603189288> | I can't find \`Muted\` role in this guild`).setColor("RED"))
    let reason = args.slice(1).join(" ")
    if (reason) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:890560104603189288> | You need to specify a reason for muting this user.`).setColor("RED"))

    let embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setAuthor(`Muted User | Case ${client.cases}`, `https://cdn.discordapp.com/emojis/742191092652310578.png?v=1`)
    .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true, size: 4096 })}`)
    .addField("**Warned User**", `${user} | \`${user.id}\``)
    .addField("**Moderator**", `${message.author} | \`${message.author.id}\``)
    .addField("**Reason**", `\`\`\`\n${reason}\n\`\`\``)
    .addField("**Timestamp**", `**\`\`\`css\n${new Date(message.createdTimestamp).toString()}\n\`\`\`**`)
    .setTimestamp();

    user.roles.add(muteRole)
    db.set(`isMuted.${members.user.id}`, true);
    client.channels.cache.get(client.config.modsChannel).send(embed)
    bot.mongo.set("case", bot.cases, {
      user: member.id,
      moderator: author.id,
      reason: reason
    })
    message.channel.send(new Discord.MessageEmbed().setDescription(`<a:yes:890559630525202432> | <@${user.id}> has been muted.`).setColor("GREEN"))
    
    
  }
  
  exports.help = {
    name: "mute",
    aliases: []
  }