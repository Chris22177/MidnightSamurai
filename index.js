const Discord = require('discord.js');
const client = new Discord.Client();
var db = require('quick.db');
const keepAlive = require('./server');
const { token, prefix } = require('./config.json')
let fs = require('fs');

//Other Things\\
var dbb = db.fetch('user.wallet');

if(dbb === null) {
db.set('user', { wallet:0 });
}

var idf = db.fetch(`user.id`);
  
  if(idf === null) {
  db.push('user', { id:`${msg.author.id}` });
  }

//Bot when ready / started\\
client.on("ready", () => {
 console.log(`${client.user.tag} is now online!`);
  
  client.user.setActivity(` The Moon | :help `, { type: "WATCHING" });
});

client.commands = new Discord.Collection();

let folder = fs.readirSync('./commands/')
               .filter(file => file.endsWith('.js' || '.mjs'))

for (let file of folder) {
     let command = require(`./commands/${file}`);
     client.commands.set(command.name, command);
}

keepAlive();

client.login(token)
