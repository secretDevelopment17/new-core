const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "sudo")){
      return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | I'm sorry but you don't have permission to do that.`).setColor("RED"));
    }
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!user) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | You need to specify a user to unjail.`).setColor("RED"))
    let prisRole = message.guild.roles.cache.find(r => r.name === "Prison")
    let jailed = await client.mongo.get(`isJail`, user.id)
    if (!jailed) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | Sorry, but <@${user.id}> is not jailed.`).setColor("RED"))
    if (!prisRole) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | I can't find \`Prison\` role in this guild`).setColor("RED"))
    let reason = args.slice(1).join(" ")
    if (!reason) reason = "No reason specified."

    let embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setAuthor(`Unjailed User`, `https://media.discordapp.net/attachments/954184065400070214/956916143283654706/unlocked_1f513.png`)
      .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true, size: 4096 })}`)
      .addField("**Unjailed User**", `${user} | \`${user.id}\``)
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
        `You has been unjailed on **${message.guild.name}**`
      )
      .addField("Reason", `\`\`\`${reason}\`\`\``)
      .addField("Moderator", `${message.author} | \`${message.author.id}\``)
      .setTimestamp();

    user.roles.remove(prisRole)
    user.send(userEmbed)
    client.channels.cache.get(client.config.modsChannel).send(embed)
    client.mongo.delete(`isJail`, user.id);
    message.channel.send(new Discord.MessageEmbed().setDescription(`<a:yes:954773528153059350> | <@${user.id}> has been unjailed.`).setColor("GREEN"))
    
  }
  
  exports.help = {
    name: "unjail",
    aliases: ["unprison"]
  }