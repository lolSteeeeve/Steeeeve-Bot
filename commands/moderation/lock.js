const Commando = require('discord.js-commando')

module.exports = class LockCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'lock',
			group: 'moderation',
			memberName: 'lock',
      guildOnly: true,
			description: 'Lock a channel down.',
			clientPermissions: ['MANAGE_CHANNELS'],
			userPermissions: ['ADMINISTRATOR'],
      args: [
				{
					key: 'channel',
					prompt: 'Which channel do you want to lock?',
					type: 'channel',
          default: message => message.channel
				},
			],
		})
	}

	async run(message, {channel}) {
		const ow = channel.permissionOverwrites.get(message.guild.id)

		if (!channel.permissionsFor(message.guild.id).has('SEND_MESSAGES')) {
			message.channel.send('Already Locked Down')
		}
		else {
			channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false })
			return message.channel.send(`✅ Success!, ${channel} has been locked down`)
		}
	}
}