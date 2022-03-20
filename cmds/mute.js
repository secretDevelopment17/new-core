const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!user) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | You need to specify a user to mute.`).setColor("RED"))
    let muteRole = message.guild.roles.cache.find(r => r.name === "Muted")
    if (!muteRole) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | I can't find \`Muted\` role in this guild`).setColor("RED"))
    let reason = args.slice(1).join(" ")
    if (reason) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | You need to specify a reason for muting this user.`).setColor("RED"))

    let embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setAuthor(`Muted User | Case ${client.cases}`, `https://cdn.discordapp.com/emojis/742191092652310578.png?v=1`)
      .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true, size: 4096 })}`)
      .addField("**Muted User**", `${user} | \`${user.id}\``)
      .addField("**Moderator**", `${message.author} | \`${message.author.id}\``)
      .addField("**Reason**", `\`\`\`\n${reason}\n\`\`\``)
      .addField("**Timestamp**", `**\`\`\`css\n${new Date(message.createdTimestamp).toString()}\n\`\`\`**`)
      .setTimestamp();

      const userEmbed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.guild.name} Muted User | Case ${client.cases}`,
          message.guild.iconURL()
        )
        .setColor("#2f3136")
        .setDescription(
          `You has been muted on **${message.guild.name}**`
        )
        .addField("Reason", `\`\`\`${reason}\`\`\``)
        .addField("Moderator", `${message.author} | \`${message.author.id}\``)
        .setFooter(`If this is a mistake, please DM our staff`)
        .setTimestamp();


    user.roles.add(muteRole)
    user.send(userEmbed)
    bot.mongo.set(`isMuted`, user.id, true);
    client.channels.cache.get(client.config.modsChannel).send(embed)
    bot.mongo.set("case", bot.cases, {
      user: member.id,
      tag: member.user.tag,
      type: "Mute",
      moderator: author.id,
      reason: reason
    })
    message.channel.send(new Discord.MessageEmbed().setDescription(`<a:yes:954773528153059350> | <@${user.id}> has been muted.`).setColor("GREEN"))
    
    
  }
  
  exports.help = {
    name: "mute",
    aliases: []
  }