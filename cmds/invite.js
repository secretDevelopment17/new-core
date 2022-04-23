const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    try {
        let member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

        let invites = await message.guild.fetchInvites()

        let memberInvites = invites.filter(i => i.inviter && i.inviter.id === member.user.id);

        if (memberInvites.size <= 0) {
            return message.channel.send(`<a:no:954773357407113298> | **${member.displayName}** never invited anyone to this server!`, (member === message.member ? null : member));
{}          }

        let content = memberInvites.map(i => i.code).join("\n");
        let index = 0;
        memberInvites.forEach(invite => index += invite.uses);

        let embed = new Discord.MessageEmbed()
            .setColor("#2f3136")
            .setFooter(message.guild.name, message.guild.iconURL())
            .setAuthor(`Invite Information for ${member.displayName}`)
            .setDescription(`**${member.displayName}** has invited ${memberInvites.size} people to this server!\n\n**Total Uses**: ${index}\n\n**Invites**:\n${content}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addField("Invited Persons", index)
            .addField("Invitation Codes\n\n", content);
        message.channel.send(embed);
    } catch (e) {
        return message.channel.send(e.stack)
    }
}
  
  exports.help = {
    name: "invite",
    aliases: ["checkinv", "inv"]
  }