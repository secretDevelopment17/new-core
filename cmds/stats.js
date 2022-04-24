const Discord = require("discord.js");
const os = require("os");
const cpuStat = require("cpu-stat");

exports.run = async (client, message, args) => {
  cpuStat.usagePercent((err, percent, _) => {
    if (err) return console.log(err);

    let u = convertMS(client.uptime);
    let us = convertMS(os.uptime() * 1000);
    let uptime =
      u.d + "d " + u.h + "h " + u.m + "m " + u.s + "s ";
    let ouptime =
      us.d + "d " + u.h + "h " + u.m + "m " + u.s + "s ";
    const b = client.readyAt;
    let start = message.createdTimestamp;
    let latency = Date.now() - start;

    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `${client.user.tag} Information`,
        client.user.displayAvatarURL()
      )
      .setColor("#2f3136")
      .addField(
        ":earth_asia: Connected to:",
        `\`\`\`asciidoc\n` +
          `• Server :: ${client.guilds.cache.size}\n` +
          `• Channels :: ${client.channels.cache.size.toLocaleString()}\n` +
          `• Users :: ${client.users.cache.size.toLocaleString()}\n` +
          `\`\`\``
      )
      .addField(
        "<:nodejs:570073411695673345> System:",
        `\`\`\`asciidoc\n` +
          `• Langs :: Node.js ${process.version}\n` +
          `• Libs :: Discord.js v${Discord.version}\n` +
          `\`\`\``
      )
      .addField(
        ":floppy_disk: Usage:",
        `\`\`\`asciidoc\n` +
          `• CPU :: ${percent.toFixed(2)}%\n` +
          `• Memory :: ${(process.memoryUsage().heapUsed / 1024 / 1024)
            .toFixed(2)
            .toLocaleString()} / ${(os.totalmem() / 1024 / 1024).toFixed(
            2
          )} MB\n` +
          `• Bot ready at :: ${b}\n` +
          `• Bot Uptime :: Booted up ${uptime}\n` +
          `• OS Uptime :: ${ouptime}\n` +
          `\`\`\``
      )
      .addField(
        "<:CPU:569348415264129057> CPU:",
        `\`\`\`md\n` +
          `${os.cpus().length}x ${os.cpus().map((i) => `${i.model}`)[0]}\n` +
          `\`\`\``
      )
      .addField(
        ":bar_chart: Other:",
        `\`\`\`asciidoc\n` +
          `• Arch :: ${os.arch()}\n` +
          `• Platform :: ${os.platform()}\n` +
          `• Latency :: ${latency.toLocaleString()} ms\n` +
          `• Websockets ping :: ${client.ws.ping.toLocaleString()} ms\n` +
          `\`\`\``
      )
      .setTimestamp()
      .setFooter(`Replying to ${message.author.tag}`);

    return message.channel.send(embed);
  });
};

exports.help = {
  name: "stats",
  aliases: ["st", "info"],
};

function parseDur(ms) {
  let seconds = ms / 1000;
  let days = parseInt(seconds / 86400);
  seconds = seconds % 86400;
  let hours = parseInt(seconds / 3600);
  seconds = seconds % 3600;
  let minutes = parseInt(seconds / 60);
  seconds = parseInt(seconds % 60);
  let fin = [];
  if (days) fin.push(`${days}d`);
  if (hours) fin.push(`${hours}h`);
  if (minutes) fin.push(`${minutes}m`);
  fin.push(`${seconds}s`);
  return fin.join(" ");
}

function convertMS(ms) {
  var d, h, m, s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  return {
    d: d,
    h: h,
    m: m,
    s: s,
  };
}
