exports.run = async (client, message, args) => {
//  message.channel.send(`ℹ | My latency is ${client.ws.ping}ms`)
//}

const start = Date.now();
  const msgs = await message.channel.send("<a:DiscordLoading:593252708404690961> Pinging my server...");
  const latency = Date.now() - start;
  const embed = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setAuthor("🏓 PONG!" )
    .addField(":signal_strength: | Latency:", `\`${latency}\`ms`, true)
    .addField(
      ":globe_with_meridians: | Websockets:",
      `\`${client.ws.ping}\`ms`,
      true
    )
    .setTimestamp();

  if (client.ws.ping <= "100") {
    embed.setColor("#21f508");
  } else if (client.ws.ping <= "300") {
    embed.setColor("#f7a53d");
  } else if (client.ws.ping >= "300") {
    embed.setColor("#f70505");
  }
  msgs.edit(embed);

}
exports.help = {
  name: "ping",
  aliases: ["p"]
}