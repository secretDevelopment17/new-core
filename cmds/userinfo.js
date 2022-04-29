const Discord = require("discord.js")
const moment = require("moment")
const momentTz = require("moment-timezone")

exports.run = async (client, message, args) => {
    let member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

    let embed = new Discord.MessageEmbed()
    .setAuthor(`${member.displayName}'s Info`, message.guild.iconURL())
    .setColor("#2f3136")
    .addField(
        "General:",
        `\`\`\`asciidoc\n` +
          `• Username :: ${member.user.tag}\n` +
          `• ID :: ${member.id}\n` +
          `• Created :: ${momentTz.tz(member.user.createdAt, "Asia/Jakarta").format('ddd MMM Do YYYY HH:mm:ss')} GMT+0700 (${moment(member.user.createdAt, "dd").fromNow()})\n` +
          `• Joined :: ${momentTz.tz(member.joinedAt, "Asia/Jakarta").format('ddd MMM Do YYYY HH:mm:ss')} GMT+0700 (${moment(member.joinedAt, "dd").fromNow()})\n` +
          `\`\`\``
      )

    message.channel.send(embed)  
}
  
  exports.help = {
    name: "userinfo",
    aliases: ["ui", "user"]
  }