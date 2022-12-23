const fs = require('fs');
const AsciiTable = require('ascii-table')
const table = new AsciiTable()
table.setHeading('Events', 'Stats').setBorder('║', '═', "╬", "╬")
const config = require('../config.json')
const eventsDir = config.bot.eventsDir

module.exports = (bot) => {
    fs.readdirSync(eventsDir).filter((file) => file.endsWith('.js')).forEach((event) => {
      	require(`.${eventsDir}/${event}`);
	table.addRow(event.split('.js')[0], '💎')
    })
	console.log(table.toString())
};
