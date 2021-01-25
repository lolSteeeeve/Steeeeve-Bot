const Commando = require('discord.js-commando')
const moment = require('moment')
const { MessageEmbed } = require('discord.js')
const { util: { permissions } } = require('discord.js-commando')

module.exports = class RoleCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'role-info',
      group: 'info',
      memberName: 'role-info',
      description: 'Detailed information on a role',
      clientPermissions: ['EMBED_LINKS'],
      guildOnly: true,
      args: [
        {
          key: 'role',
          prompt: 'Which role would you like to get information?',
          type: 'role'
        }
      ]
    })
  }

  run(msg, { role }) {
    const serialized = role.permissions.serialize()
    const perms = Object.keys(permissions).filter(perm => serialized[perm])
    const embed = new MessageEmbed()
      .setTitle(`Server: ${msg.guild.name}`)
      .setThumbnail(msg.guild.iconURL({ format: 'png' }))
      .setColor(role.hexColor)
      .addField('Role', `<@&${role.id}>`)
      .addField('Role ID', role.id)
      .addField('Color', role.hexColor.toUpperCase())
      .addField('Creation Date', moment.utc(role.createdAt).format('MM/DD/YYYY h:mm A'))
      .addField('Mentionable', role.mentionable ? 'Yes' : 'No')
      .addField('Permissions', perms.map(perm => permissions[perm]).join(', ') || 'None')
    msg.channel.send(embed)
  }
}