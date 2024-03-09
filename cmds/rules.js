const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if(!message.member.hasPermission('ADMINISTATOR') && !message.member.roles.cache.some((r) => r.name === "sudo")){
    return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | I'm sorry but you don't have permission to do that.`).setColor("RED"));
  }

    let guildIcon = message.guild.iconURL()
    let ABOUT = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setAuthor("Server About", guildIcon, `https://dsc.gg/finix`)
    .setDescription("```Welcome to FINIX! Before starting you must read the rules below. Here you can play and socialize with other people. This server has many interesting features in it. You can discuss games, programming, learning, video editors, and much more! So what are you waiting for? Read the rules below and start exploring the server! Don't forget to take the role below by clicking on the emoji```")

    let RULES = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setAuthor("Server Rules", guildIcon, `https://dsc.gg/finix`)
    .setDescription(`
    ▪ No spamming, flooding, or self-promotion
    ▪ Don't share NSFW content on random channels
    ▪ Don't direct message anyone unless you already know them personally
    ▪ Abusing is allowed but stay in your limits
    ▪ Last but not the least, be respectful of others! This includes but not limited to, refrain from being toxic, using hate speech, racism and sexual harassment\n
        \`\`\`Simple rules, but every staff is different, staff can take any action and whenever they want\`\`\`
    `)
    .addField("Note:", "Keep in mind that our servers have smart AI designed to protect our servers. Our AI works without sleep (he is not human), automod works non-stop every day (unless there are some things)")
    .addField("Invite Link:", "https://dsc.gg/finix")
    .setFooter("Regards, Admin")

    let ROLES = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setAuthor("Server Roles", guildIcon, `https://dsc.gg/finix`)
    .setDescription(`Take the role below by clicking the reaction below. **DO NOT SPAM CLICK**. If you are caught playing click spam, you will be given a <@&956904276335144970> role`)
    .addField("💵 - Free Games Ping", "> You will get a mention if there are free games on a platform. Apart from being free, there are also discount game notifications")
    .addField("🎮 - Game Update Ping", "> You will get a mention if there is a game update or new patch. You can request the game you want to add")
    .addField("▶️ - Youtube Ping", "> You will get a mention if there is a video or live video from YouTube. You can request the channel you want to add")
    .addField("🏆 - MPL ID Ping", "> You will get a mention if there is an MPL ID match schedule for that day or information if you want to watch it together")

    if (!args[0]) {
      message.channel.send(new Discord.MessageEmbed().setDescription(`<a:no:954773357407113298> | Please select one Please select one of \`all\`, \`about\`, \`rules\`, \`roles\``).setColor("RED"))
    } else if (args[0] == "all") {
      client.channels.cache.get(client.config.rulesChannel).send(ABOUT)
      client.channels.cache.get(client.config.rulesChannel).send(RULES)
      client.channels.cache.get(client.config.rulesChannel).send(ROLES)
    } else if (args[0] == "about") {
      client.channels.cache.get(client.config.rulesChannel).send(ABOUT)
    } else if (args[0] == "rules") {
      client.channels.cache.get(client.config.rulesChannel).send(RULES)
    } else if (args[0] == "roles") {
      client.channels.cache.get(client.config.rulesChannel).send(ROLES)
    }
  }
  
  exports.help = {
    name: "rules",
    aliases: []
  }