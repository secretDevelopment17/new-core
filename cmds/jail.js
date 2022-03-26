const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "sudo")){
      return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | I'm sorry but you don't have permission to do that.`).setColor("RED"));
    }
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!user) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | You need to specify a user to jail.`).setColor("RED"))
    let prisRole = message.guild.roles.cache.find(r => r.name === "Prison")
    if (!prisRole) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | I can't find \`Prison\` role in this guild`).setColor("RED"))
    let reason = args.slice(1).join(" ");
    if (!reason) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | You need to specify a reason for prisoning this user.`).setColor("RED"))

    let embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setAuthor(`Jailed User | Case ${client.cases}`, `https://media.discordapp.net/attachments/954184065400070214/956916142977450054/locked_1f512.png`)
      .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true, size: 4096 })}`)
      .addField("**Jailed User**", `${user} | \`${user.id}\``)
      .addField("**Moderator**", `${message.author} | \`${message.author.id}\``)
      .addField("**Reason**", `\`\`\`\n${reason}\n\`\`\``)
      .addField("**Timestamp**", `**\`\`\`css\n${new Date(message.createdTimestamp).toString()}\n\`\`\`**`)
      .setTimestamp();

      const userEmbed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.guild.name} Jailed User | Case ${client.cases}`,
          message.guild.iconURL()
        )
        .setColor("#2f3136")
        .setDescription(
          `You has been jailed on **${message.guild.name}**`
        )
        .addField("Reason", `\`\`\`${reason}\`\`\``)
        .addField("Moderator", `${message.author} | \`${message.author.id}\``)
        .setFooter(`If this is a mistake, please DM our staff`)
        .setTimestamp();


    user.roles.add(prisRole)
    user.send(userEmbed)
    client.mongo.set(`isJail`, user.id, true);
    client.channels.cache.get(client.config.modsChannel).send(embed)
    client.mongo.set("case", client.cases, {
      user: user.id,
      tag: user.user.tag,
      type: "Prison",
      moderator: message.author.id,
      reason: reason
    })
    message.channel.send(new Discord.MessageEmbed().setDescription(`<a:yes:954773528153059350> | <@${user.id}> has been jailed.`).setColor("GREEN"))
    
    
  }
  
  exports.help = {
    name: "jail",
    aliases: ["prison"]
  }