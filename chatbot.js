// require the discord.js module
const Discord = require('discord.js');
// Configuration file
const { prefix, token } = require('./config.json');
// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.on ('ready', () => {
    console.log("Conected as " + client.user.tag + " Ready!");
    
client.on('message', message => {
    // send back "Welecome to my Discord Server!" to the channel 
    // the message was sent in
    if (message.content === '!kee') {
        message.channel.send('Welcome to my Discord Server!');
    }
});    
        
// client.user.setActivity        
// client.user.setActivity("with JavaScript");    
client.user.setActivity("Youtube", {type: "WATCHING"});

// CHANNEL 
client.guilds.forEach((guild) => {
    console.log(guild.name);
    guild.channels.forEach((channel) => {
        console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
    });              
    // General Channel id 398581574427213826                
});          
    let generalChannel = client.channels.get("398581574427213826");
    const attachment = 
       new Discord.Attachment("https://keeyanajones.github.io/website/assets/img/avatar.png");    
    generalChannel.send(attachment);
});

// MESSAGE 
client.on('message', (receivedMessage) => {
   if (receivedMessage.author === client.user) {
       return;   
    }

// REPEAT MESSAGE
   receivedMessage.channel.send("Message received : " + 
        receivedMessage.author.toString() + " : " + 
        receivedMessage.content);
    
   receivedMessage.guild.emojis.forEach(customEmoji => {
       console.log(`${customEmoji.name} ${customEmoji.id}`);
       receivedMessage.react(customEmoji); 
   });
});

// COMMANDS
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

// PING 
    if (command === 'ping') {
	message.channel.send('Pong.');                
// DING
    } else if (command === 'ding') { 
	message.channel.send('Dong.');                
// BEEP                
    } else if (command === 'beep') {
	message.channel.send('Boop.');
// SERVER                
    } else if (command === 'server') {
		message.channel.send(`Server name: ${message.guild.name}
        \nTotal members: ${message.guild.memberCount}`);
// USER-INFO                
    } else if (command === 'user-info') {
		message.channel.send(`Your username: ${message.author.username}
        \nYour ID: ${message.author.id}`);
// INFO                
    } else if (command === 'info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	} else if (args[0] === 'foo') {
            return message.channel.send('bar');
	}
	message.channel.send(`First argument: ${args[0]}`);                
// KICK                
    } else if (command === 'kick') {
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to kick them!');
        }

        const taggedUser = message.mentions.users.first();

        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
// AVATAR                
	} else if (command === 'avatar') {
            if (!message.mentions.users.size) {
            	return message.channel.send(`Your avatar: 
                    <${message.author.displayAvatarURL}>`);
            }

            const avatarList = message.mentions.users.map(user => {
		return `${user.username}'s avatar: <${user.displayAvatarURL}>`;                                             
            });

            message.channel.send(avatarList);
// PRUNE                
	} else if (command === 'prune') {
            const amount = parseInt(args[0]) + 1;
            
	    if (isNaN(amount)) {
                return message.reply('that doesn\'t seem to be a valid number.');
            } else if (amount <= 1 || amount > 100) {
                return message.reply('you need to input a number between 1 and 99.');
            }

            message.channel.bulkDelete(amount, true).catch(err => {
                console.error(err);
                message.channel.send('there was an error trying to prune messages in this channel!');
            });
	}
});

// login to Discord with your app's token
client.login(token);



