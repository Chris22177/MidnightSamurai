module.exports = {
name: 'ping',
description: 'Bot Latency',
execute(message, args) {
  message.channel.send('Pinging...')
    .then((message)=> {
      setTimeout(function() {
        message.edit(`Ping: ${client.ws.ping}ms`);
    
    console.log(`Recent Ping: ${client.ws.ping}ms`);
      }, 2500);
    });
}}