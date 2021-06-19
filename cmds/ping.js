exports.run = async (client, message, args) => {
  message.channel.send(`ℹ | My latency is ${client.ws.ping}ms`)
}

exports.help = {
  name: "ping",
  aliases: []
}