const Discord = require('discord.js');
const client = new Discord.Client();
var db = require('quick.db');
const keepAlive = require('./server');
const { token, prefix } = require('./config.json')

//Other Things
var dbb = db.fetch('user.wallet');

if(dbb === null) {
db.set('user', { wallet:0 });
}

//Bot when ready / started\\
client.on("ready", () => {
 console.log(`${client.user.tag} is now online!`);
  
  client.user.setActivity(` The Moon | :help `, { type: "WATCHING" });
});

client.on('message', msg => {
  if(msg.author.bot) return;
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  
  var idf = db.fetch(`user.id`);
  
  if(idf === null) {
  db.push('user', { id:`${msg.author.id}` });
  }
  
 //bot command function\\
  function cmd(str) {
   return msg.content.startsWith(str)
  }
  
  function sendmsg(str) {
    return msg.channel.send(str)
  }
//send message in a channel function\\
  
if (cmd(':ping')) {
sendmsg('Pinging...')
    .then((msg) => {
      setTimeout(function() {
        msg.edit(`Ping: ${client.ws.ping}ms`);
    
    console.log(`Recent Ping: ${client.ws.ping}ms`);
      }, 2500);
    });
}
    
  
  if(cmd(':work')) {
   var f = db.fetch('user.cdwork');
   
   if(f === null) {
    db.push('user', { cdwork:0 });
   }
    
    var made = Math.floor(Math.random() * 100 )+12;
var jobs = ["YouTuber", "Twitch Streamer", "Teacher", "Developer", "Samurai", "Scientist", "Politician", "Chef", "Karen", "Cashier", "Manager", "Office Staff", "Area 51 Officer", "Drug Dealer", "Fisherman"]; 
var jobReply = Math.floor(Math.random() * jobs.length);

db.add(`user.wallet`, made);

sendmsg(`You went and worked as a ${jobs[jobReply]} and made $${made}`);
}
  
  if(cmd(':bal') || cmd(':balance')) {
    sendmsg(`💸 Wallet: $${db.get('user.wallet')}`);
  }
  
  if(cmd(':eval') && msg.author.id === "690451364983078942" || cmd(':eval') && msg.author.id === "609899399358971924") {
    try {
      var r = eval(msg.content.split(" ").slice(1).join(" "));
      
      sendmsg('Output:\n\n' + r);
    } catch(err) {
      sendmsg('Error ❌\n\n' + err);
  }
   }
   
   if(cmd('uptime') || cmd(':u')) {
     let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);
     
     let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
     
     sendmsg(uptime);
   }
   
   if(cmd(':help') || cmd(':h')) {
     let embed = new Discord.MessageEmbed()
     .setColor('RANDOM')
     .setTitle('Midnight Samurai 🌙')
     .setDescription('```\nEconomy Commands\n```\n*:work (Earn money)\n:balance (Check how much money you have)*\n\n```\nOther commands\n```\n*:ping (Check the bots latency)\n:uptime (Check how long the bot has been online for)*\n\n```\nBot owner commands\n```\n*:eval (evaluates written code)*');
     
     sendmsg(embed);
   }
  
 });

keepAlive();

client.login(token);