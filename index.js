// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

//返答（メッセージに反応して結果を返します。）
client.on('messageCreate', message => {
    if (message.author.bot) {
        return;
    }

    if (message.content == 'ping') {
        message.channel.send('pong!');
    }
});

//コマンド登録（事前にnode deploy-command.jsを実行した上で使えるコマンドたちです。）
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	} else if (commandName === 'hi') {
		await interaction.reply(`hi!`);
	}
});

// Login to Discord with your client's token
client.login(token);