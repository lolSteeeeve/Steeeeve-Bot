const Commando = require('discord.js-commando')
const { MessageEmbed} = require('discord.js')
const { formatNumber } = require('../../util/Util')

module.exports = class PingCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'util',
			memberName: 'ping',
			description: 'Checks Floppa-Bot Ping',
      clientPermissons: ['EMBED_LINKS']
		})
	}

  async run(msg) {
	  console.log('kk')
	const embed = new MessageEmbed()
    .setTitle('Latency')
    .setColor('#ff7824')
    .setDescription(`Floppa-Bot Latency: \`${formatNumber(Math.round(this.client.ws.ping))}\`ms`)
    msg.channel.send(embed)
	}
}
