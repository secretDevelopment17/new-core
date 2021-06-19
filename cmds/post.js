const Discord = require("discord.js")
const { WebhookClient } = require("discord.js");

exports.run = async (client, message, args) => {
    if (!args[0]) {
        message.channel.send(`self-roles, rules`)
      } else if(args[0] == 'self-roles') {
     
        const webhook = new WebhookClient("855483480536121364", "6Hp_UGpuM94RFdP8HZGLOxT_tMNyDeVOpGg92mxN3Y1zi6p3lYWCZ7x-JmBQygw-tpcR"); 

        let embed = new Discord.MessageEmbed()
        .setColor("BLURPLE")
        .setAuthor("Take your role ・ Self Role", message.guild.iconURL({size: 4096}))
        .setDescription(`
        ◈ 🎉 <@&764431259144945695> 
        ⤷ You will get a ping when there is a giveaway on this server

        ◈ 🆓 <@&854688936101937182> 
        ⤷ You will get a ping when there are free games from certain platforms

        ◈ 🔞 <@&747099563118297230>
        ⤷ You will be able to access the NSFW channel
        `)

        webhook.send(embed)
      } else if(args[0] == 'rules') {

        const webhook = new Discord.WebhookClient("787666807329914890", "0Sp6kpudg7TpCDf0Cpg-z2n9JYpyGSVALYDeF_r4-qY6cVRnP0WNvLMo_miloUW1vfbH")
        
        let info = new Discord.MessageEmbed()
        .setAuthor(`Server Information`, message.guild.iconURL({ size: 4096 }))
        .setColor("BLURPLE")
        .setDescription(`
        > Welcome to **ThePeanuts~**, we are happy to welcome you, we hope you will be comfortable with your new home. Before you do anything, you have to read the rules that we have provided
        \n
        > Wait, wait, before you start you have to read the rules that we discussed earlier
        `)
        
        let rules = new Discord.MessageEmbed()
        .setAuthor(`Server Rules`, message.guild.iconURL({ size: 4096 }))
        .setColor("BLURPLE")
        .setDescription(`
        **You are not allowed to:**
        ✦ Racist, Bullying, Flaming, Flooding, Hoax, and Spamming

        ✦ Bad words and toxic

        ✦ Pinging Staff or other users without a specific reason

        ✦ Discussion of illegal activities such as drugs, threats or hacking

        ✦ Talk or joking about rape, at all. Leaking any information regarding other users is frowned upon and is a cannot bannable offense(Includes user's actual name, age, location, etc)
        
        ✦ It is strictly forbidden to send pictures, any links involved with NSFW
        
        ✦ There may not be any promotion on this server. If you want to promote your discord server, you can partner with us, contact the staff for more
        
        ✦ Making dramas is strictly prohibited because it really annoys other users
        
        ✦ If you are on a voice channel, you may not disturb other users on it
        
        ✦ Don't be annoying
        
        **Note:** We created these rules solely to keep servers conducive. So if you break the rules that we provide, the staff will give you a separate penalty
        `)             
        
        let link = new Discord.MessageEmbed()
        .setAuthor(`Server Link`, message.guild.iconURL({ size: 4096 }))
        .setColor("BLURPLE")
        .setDescription(`
        **Invite Link:**
        **https://discord.gg/XAN2AJr**
        
        **Website:** [Maintenance]
        **https://www.secretdev.tech/**
        
        **Other Link:**
        ・ **[YouTube](https://www.youtube.com/channel/UCeMM8b7Wt3Y4goKzR-Xf-Hw)** ・ | ・ **[Instagram](https://www.instagram.com/secretdev_)** ・ | ・ **[Donate](https://karyakarsa.com/secretdevelopment)** ・ | ・ **[Vote our server](https://top.gg/servers/733684454027034685)** ・ | ・ **[GitHub](https://github.com/SecretDevelopment17)** ・
        `)
        
        webhook.send(info)
        webhook.send(rules)
        webhook.send(link)
        webhook.send(`
        <:cbook:737560891960197150> | **Other Notes**
        > \`-\` Thanks for reading before start guide
        > \`-\` Rules can change at any time according to conditions
        > \`-\` Enjoy for playing!
        `)  
       
      }
}

exports.help = {
    name: "post",
    aliases: []
  }