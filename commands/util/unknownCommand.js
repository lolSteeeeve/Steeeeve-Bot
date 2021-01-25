const Commando = require('discord.js-commando')

module.exports = class UnknownCommandCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'unknown-command',
			group: 'util',
			memberName: 'unknown-command',
			description: 'Displays help information for when an unknown command is used.',
			unknown: true,
			hidden: true,
			guarded: true
		})
	}

	run(msg) {
		msg.channel.send('Unknown command. Use \`f!help\` or \`@Floppa-Bot#6772 help\` to view the command list.')
	}
}