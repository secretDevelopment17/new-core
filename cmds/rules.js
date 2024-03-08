const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    let guildIcon = message.guild.iconURL()
    let RULES = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setAuthor("Server Rules", guildIcon, `https://discord.gg/tJCQZVwGaT`)
    .setDescription(`
        - No spamming, flooding, or self-promotion\n
        - Don't share NSFW content on random channels\n
        - Don't direct message anyone unless you already know them personally
        - Abusing is allowed but stay in your limits
        - Last but not the least, be respectful of others! This includes but not limited to, refrain from being toxic, using hate speech, racism and sexual harassment\n
        \`\`\`Simple rules, but every staff is different, staff can take any action and whenever they want\`\`\`
    `)
    .addField("Note:", "> Keep in mind that our servers have smart AI designed to protect our servers. Our AI works without sleep (he is not human), automod works non-stop every day (unless there are some things)")
    .addField("Invite Link:", "> https://discord.gg/tJCQZVwGaT")
    .setFooter("Regards, Admin")

    client.channels.cache.get(client.config.rulesChannel).send(RULES)
  }
  
  exports.help = {
    name: "rules",
    aliases: []
  }