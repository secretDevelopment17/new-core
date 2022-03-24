const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    let user = message.mentions.users.first() || client.users.resolve(args[0]) || message.author;
    let image = user.avatarURL({ dynamic: true, size: 4096 });
    let embed = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setAuthor(`${user.username}#${user.discriminator} Avatar`, image, `https://media.discordapp.net/attachments/575097325945618432/956523208717238282/903868915581616189.png`)
        .setImage(image)
        .setFooter(`Requested by ${message.author.tag}`)
        .setTimestamp();

    message.channel.send(embed);    
  }
  
  exports.help = {
    name: "avatar",
    aliases: ["av", "ava", "pp"]
  }