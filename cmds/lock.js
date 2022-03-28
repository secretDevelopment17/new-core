const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS') && !message.member.roles.cache.some((r) => r.name === "sudo")){
        return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | I'm sorry but you don't have permission to do that.`).setColor("RED"));
    }
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
    let reason = args.join(" ") || 'Not Specified'

    if(channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === false) {
        const lockchannelError2 = new MessageEmbed()
        .setDescription(`<a:no:954773357407113298> | ${channel} is already locked!`)
        .setColor("RED")

        return message.channel.send(lockchannelError2)
    }

    channel.updateOverwrite(message.guild.id, { SEND_MESSAGES: false })
    message.channel.send(new MessageEmbed().setDescription(`<a:yes:954773528153059350> | Channel ${channel} has been locked because \`${reason}\``).setColor("GREEN"))
}

exports.help = {
    name: "lock",
    aliases: ["lockdown"]
}