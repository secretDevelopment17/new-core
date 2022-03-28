const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('BAN_MEMBERS') && !message.member.roles.cache.some((r) => r.name === "sudo")){
        return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | I'm sorry but you don't have permission to do that.`).setColor("RED"));
    }

        if (!args[0]) {
            return message.channel.send(new MessageEmbed().setDescription(`<a:no:954773357407113298> | You need to specify a amount between 1-100.`).setColor("RED"));
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;

        } else {
            deleteAmount = parseInt(args[0]);
        }

        await message.channel.bulkDelete(deleteAmount, true);
        await message.channel.send(new MessageEmbed().setDescription(`<a:yes:954773528153059350> | Deleted **${deleteAmount}** chats`).setColor("GREEN")).then(message => message.delete({timeout: 5000}))

    }

exports.help = {
    name: "purge",
    aliases: ["clear", "prune"]
}