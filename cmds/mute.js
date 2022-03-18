const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let muteRole = message.guild.roles.find(r => r.name === "Muted")
    if (!muteRole) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:890560104603189288> | I can't find \`Muted\` role in this guild`).setColor("RED"))
    
    user.roles.add(muteRole)
    db.set(`isMuted.${members.user.id}`, true);
    message.channel.send(new Discord.MessageEmbed().setDescription(`<a:yes:890559630525202432> | <@${user.id}> has been muted.`).setColor("GREEN"))
    
    
  }
  
  exports.help = {
    name: "mute",
    aliases: []
  }