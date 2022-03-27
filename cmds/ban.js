const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('BAN_MEMBERS') && !message.member.roles.cache.some((r) => r.name === "sudo")){
      return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | I'm sorry but you don't have permission to do that.`).setColor("RED"));
    }
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!user) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | You need to specify a user to ban.`).setColor("RED"))
    if (user.hasPermission("BAN_MEMBERS")) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | I'm sorry but I can't ban that member.`).setColor("RED"))
    let reason = args.slice(1).join(" ");
    if (!reason) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | You need to specify a reason for banning this user.`).setColor("RED"))

    let embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setAuthor(`Banned User | Case ${client.cases}`, `https://media.discordapp.net/attachments/575097325945618432/957614662587920414/3426444.png`)
      .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true, size: 4096 })}`)
      .addField("**Banned User**", `${user} | \`${user.id}\``)
      .addField("**Moderator**", `${message.author} | \`${message.author.id}\``)
      .addField("**Reason**", `\`\`\`\n${reason}\n\`\`\``)
      .addField("**Timestamp**", `**\`\`\`css\n${new Date(message.createdTimestamp).toString()}\n\`\`\`**`)
      .setTimestamp();

      const userEmbed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.guild.name} Banned User | Case ${client.cases}`,
          message.guild.iconURL()
        )
        .setColor("#2f3136")
        .setDescription(
          `You has been banned on **${message.guild.name}**`
        )
        .addField("Reason", `\`\`\`${reason}\`\`\``)
        .addField("Moderator", `${message.author} | \`${message.author.id}\``)
        .setFooter(`If this is a mistake, please DM our staff`)
        .setTimestamp();

    message.guild.member(user).ban({ days: 0, reason: reason });    
    user.send(userEmbed);
    client.channels.cache.get(client.config.modsChannel).send(embed);
    client.mongo.set("case", client.cases, {
      user: user.id,
      tag: user.user.tag,
      type: "Ban",
      moderator: message.author.id,
      reason: reason
    });
    message.channel.send(new Discord.MessageEmbed().setDescription(`<a:yes:954773528153059350> | <@${user.id}> has been banned.`).setColor("GREEN"));
    
    
  }
  
  exports.help = {
    name: "ban",
    aliases: []
  }