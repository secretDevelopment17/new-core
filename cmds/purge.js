const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (
    !message.member.hasPermission("MANAGE_MESSAGES") &&
    !message.member.roles.cache.some((r) => r.name === "sudo")
  ) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          `<a:no:954773357407113298> | I'm sorry but you don't have permission to do that.`
        )
        .setColor("RED")
    );
  }

  let amount = parseInt(args[0]);
  if (amount)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          `<a:no:954773357407113298> | You must provide amount to delete chat.`
        )
        .setColor("RED")
    );
  message.channel.bulkDelete(amount).then(() => {
    message.channel
      .send(
        new Discord.MessageEmbed()
          .setDescription(
            `<a:yes:954773528153059350> | Deleted **${args[0]}** chats`
          )
          .setColor("GREEN")
      )
      .then((msg) => msg.delete(5000));
  });
};

exports.help = {
  name: "purge",
  aliases: ["clear"],
};
