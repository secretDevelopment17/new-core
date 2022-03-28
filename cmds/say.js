const Discord = require("discord.js");

exports.run = async (client, message, args) => {

  let say = args.join(" "); 
  if(!say) return message.channel.send(new Discord.MessageEmbed().setDescription("<a:no:954773357407113298> | Please provide a message to say.").setColor("RED"));
  
  message.delete()  
  message.channel.send(say); 

};

exports.help = {
  name: "say",
  aliases: [],
};
