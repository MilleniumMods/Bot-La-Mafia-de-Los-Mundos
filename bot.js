const { Client, Collection, ActivityType, GatewayIntentBits, Partials } = require("discord.js");
const config = require("./config.json");
const tokens = require('./tokens.json')
const fs = require("fs");

const bot = new Client(
    {
        disableEveryone: false,
        partials: [Partials.Message, Partials.Channel, Partials.Reaction],
        // Seguramente hay una mejor manera de llamar a todos los intents, pero naaaaaah
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildBans,
            GatewayIntentBits.GuildEmojisAndStickers,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildScheduledEvents
        ]
    }
);

bot.commands = new Collection()
bot.slashCommands = new Collection();

module.exports = bot;

process.on('unhandledRejection', error => {
    console.error('Uncaught Promise Rejection', error)
});


bot.on("ready", () => {
    const activities_list = [
        "mc.milleniummods.com",
        "a <destruir> huérfanos"
    ];

    setInterval(() => {
        const statuses = Math.floor(Math.random() * (activities_list.length));
        bot.user.setPresence({
            activities: [{ name: activities_list[statuses], type: ActivityType.Playing }],
            status: 'online'
        })
        
    }, 10000);

});

    try {

        fs.readdirSync('./handlers').forEach((handler) => {
            require(`./handlers/${handler}`)(bot)
        });

    } catch(error) {
        console.log(`Hubo un error al intentar registrar los event handlers`, error)
    }

bot.on("ready", () => {
    console.log(`\nLogs del bot empiezan aquí:`)
    console.log(`Lista de servidores en los que está el bot:`)
    console.log(bot.guilds.cache.map(guild => guild.name));
});

bot.login(tokens.bot_token)
    .then(() => console.log(`Bot online cómo ${bot.user.tag}.`))
    .catch(err => console.error("No se ha podido iniciar sesión", err));
