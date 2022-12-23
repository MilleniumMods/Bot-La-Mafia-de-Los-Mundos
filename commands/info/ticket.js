const Discord = require("discord.js")
const config = require("../../config.json")

const { EmbedBuilder, ApplicationCommandType } = require('discord.js');

let options = ['Ayuda general', 'Soporte de compras', 'Reporte a un usuario/staff', 'Reporte de un error', 'Aplicar a un cargo']
        
module.exports = {
	name: 'ticket', // name can't contain capital letters
	description: "Crea un ticket para que nuestro equipo pueda ayudarte",
	type: ApplicationCommandType.ChatInput, // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
    cooldown: 3000,
    requires_supervisor: false,
    requires_botmanager: false,
    requires_moderator: true,
    command_type: 'moderator',
	options: [
        {
            name: 'mensaje',
            description: '¿Con qué necesitas ayuda?',
            type: 3, // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
            required: true,
            autocomplete: false
        },
        {
            name: 'categoría',
            description: '¿En qué categoría quieres crear el ticket?',
            type: 3, // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
            required: true,
            autocomplete: true
        }
    ],
    autocomplete: async (interaction, choices) => {

        options.forEach(option => {
            choices.push({
                name: `${option}`,
                value: `${option}`
            });
        });
        interaction.respond(choices).catch(console.error);

    },
	run: async (bot, interaction) => {

        switch(interaction.options.get('categoría').value) {
            case interaction.options.get('categoría').value == options[0]:

            return;
            case interaction.options.get('categoría').value == options[1]:

            return;
            case interaction.options.get('categoría').value == options[2]:
        
            return;
            case interaction.options.get('categoría').value == options[3]:

            return;
            case interaction.options.get('categoría').value == options[4]:

            return;
        }

    }
}