const fs = require('fs');

const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest')

const config = require('../config.json')
const tokens = require('../tokens.json')
const commandsDir = config.bot.commandsDir

const AsciiTable = require('ascii-table');
const table = new AsciiTable().setHeading('Slash Commands', 'Stats').setBorder('║', '═', "╬", "╬")

const TOKEN = tokens.bot_token;
const CLIENT_ID = config.bot.id;

const rest = new REST().setToken(TOKEN);

module.exports = (bot) => {
	const slashCommands = []; 

	fs.readdirSync(commandsDir).forEach(async dir => {
		const files = fs.readdirSync(`${commandsDir}/${dir}/`).filter(file => file.endsWith('.js'));

		for(const file of files) {
				const slashCommand = require(`.${commandsDir}/${dir}/${file}`);
				slashCommands.push({
					name: slashCommand.name,
					description: slashCommand.description,
					type: slashCommand.type,
					options: slashCommand.options ? slashCommand.options : null,
                });
			
				if(slashCommand.name) {
						bot.slashCommands.set(slashCommand.name, slashCommand)
						table.addRow(file.split('.js')[0], '💎')
				} else {
						table.addRow(file.split('.js')[0], '💥')
				}
		}
		
	});
	console.log(table.toString());

	(async () => {
			try {
				await rest.put(
					config.bot.guildID ?
					Routes.applicationGuildCommands(CLIENT_ID, config.bot.guildID) :
					Routes.applicationCommands(CLIENT_ID), 
					{ body: slashCommands }
				);
				console.log('Slash Commands registrados')
			} catch (error) {
				console.log(`Ha habido un error al registrar los Slash Commands`, error);
			}
	})();
};
