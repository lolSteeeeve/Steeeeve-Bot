const Commando = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const { formatNumber } = require('../../util/Util')

module.exports = class HelpCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'help',
			group: 'help',
			memberName: 'help',
			description: 'Displays a list of available commands',
			guarded: true,
      clientPermissions: ['EMBED_LINKS'],
		})
	}

	async run(msg) {
    const embed = new MessageEmbed()
    .setTitle('Available Commands for Steeeeve-Bot')
    .setThumbnail(this.client.user.displayAvatarURL())
    .setColor('RANDOM')
    .setDescription(`To run a command use \`s!<command>\` or \`@Steeeeve-Bot#6928 <command>\``)
    .addField('Events', 'Covid')
    .addField('Fun', 'Aww, Meme')
    .addField('Moderation', 'Ban, Kick, Lock, Purge, Slowmode, Unban, Unlock')
    .addField('Info', 'Channel-Info, Role-Info, Server-Info, User-Info')
    .addField('Utility', 'Ping, Prefix')
    .addField('Total Commands', formatNumber(this.client.registry.commands.size))
    msg.channel.send(embed)
	}
}
