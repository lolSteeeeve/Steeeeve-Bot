const Commando = require('discord.js-commando')

module.exports = class UnlockCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'unlock',
			group: 'moderation',
			memberName: 'unlock',
      guildOnly: true,
			description: 'Unlock a channel.',
			clientPermissions: ['MANAGE_CHANNELS'],
			userPermissions: ['ADMINISTRATOR'],
      args: [
				{
					key: 'channel',
					prompt: 'Which channel do you want to lock down?',
					type: 'channel',
          default: message => message.channel
				},
			],
		})
	}
	async run(message, {channel}) {
  		const ow = channel.permissionOverwrites.get(message.guild.id)

		if (channel.permissionsFor(message.guild.id).has('SEND_MESSAGES')) {
			return message.channel.send('Channel already unlocked')
		} 
		else {
			channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: true })
			message.channel.send(`✅ Success!, ${channel} has been unlocked`)
		}
	}
}