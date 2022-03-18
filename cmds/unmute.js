const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let muteRole = message.guild.roles.find(r => r.name === "Muted")
    let muted = await db.fetch(`isMuted.${user.id}`)
    if (!muted) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:890560104603189288> | Sorry, but <@${user.id}> is not muted.`).setColor("RED"))
    if (!muteRole) return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:890560104603189288> | I can't find \`Muted\` role in this guild`).setColor("RED"))
    
    user.roles.remove(muteRole)
    db.delete(`isMuted.${user.id}`)
    message.channel.send(new Discord.MessageEmbed().setDescription(`<a:yes:890559630525202432> | <@${user.id}> has been unmuted.`).setColor("GREEN"))
    
  }
  
  exports.help = {
    name: "unmute",
    aliases: []
  }