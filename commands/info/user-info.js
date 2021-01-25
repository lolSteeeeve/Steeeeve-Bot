const Commando = require('discord.js-commando')
const moment = require('moment')
const { MessageEmbed } = require('discord.js')
const { trimArray } = require('../../util/Util')
const flags = {
  DISCORD_EMPLOYEE: 'Discord Employee',
  PARTNERED_SERVER_OWNER: 'Discord Partner',
  BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
  BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
  HYPESQUAD_EVENTS: 'HypeSquad Events',
  HOUSE_BRAVERY: 'House of Bravery',
  HOUSE_BRILLIANCE: 'House of Brilliance',
  HOUSE_BALANCE: 'House of Balance',
  EARLY_SUPPORTER: 'Early Supporter',
  TEAM_USER: 'Team User',
  SYSTEM: 'System',
  VERIFIED_BOT: 'Verified Bot',
  EARLY_VERIFIED_DEVELOPER: 'Early Verified Bot Developer'
}
const deprecated = ['DISCORD_PARTNER', 'VERIFIED_DEVELOPER'];

module.exports = class UserCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'user-info',
      group: 'info',
      memberName: 'user-info',
      guildOnly: true,
      description: 'Detailed information of a user',
      clientPermissions: ['EMBED_LINKS'],
      args: [
        {
          key: 'user',
          prompt: 'Which user would you like to get information?',
          type: 'user',
          default: msg => msg.author
        }
      ]
    })
  }

  async run(msg, { user }) {
    const userFlags = user.flags ? user.flags.toArray().filter(flag => !deprecated.includes(flag)) : []
    const embed = new MessageEmbed()
      .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
      .setColor('#ff7824')
      .setTitle(`Information of ${user.tag}`)
      .addField('Discord Join Date', moment.utc(user.createdAt).format('MM/DD/YYYY h:mm A'))
      .addField('User ID', user.id)
      .addField('Bot', user.bot ? 'Yes' : 'No')
      .addField('Badges', userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None')
    msg.channel.send(embed)
  }
}