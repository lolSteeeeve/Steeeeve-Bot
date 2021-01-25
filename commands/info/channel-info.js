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
const Commando = require('discord.js-commando')
const moment = require('moment')
const { MessageEmbed } = require('discord.js')
const types = {
  dm: 'DM',
  group: 'Group DM',
  text: 'Text Channel',
  voice: 'Voice Channel',
  category: 'Category',
  unknown: 'Unknown'
}

module.exports = class ChannelCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'channel-info',
      group: 'info',
      memberName: 'channel-info',
      description: 'Detailed information on a channel',
      guildOnly: true,
      clientPermissions: ['EMBED_LINKS'],
      args: [
        {
          key: 'channel',
          prompt: 'Which channel would you like to get information on?',
          type: 'channel',
          default: msg => msg.channel
        }
      ]
    })
  }

  run(msg, { channel }) {
    const embed = new MessageEmbed()
      .setTitle(`Information of ${msg.channel.name}`)
      .setColor('#ff7824')
      .setThumbnail(msg.guild.iconURL({ format: 'png' }))
      .addField('Server', msg.guild.name)
      .addField('Name', channel.type === 'dm' ? `@${channel.recipient.username}` : channel.name)
      .addField('Channel ID', channel.id)
      .addField('NSFW', channel.nsfw ? 'Yes' : 'No')
      .addField('Category', channel.parent ? channel.parent.name : 'None')
      .addField('Type', types[channel.type])
      .addField('Creation Date', moment.utc(channel.createdAt).format('MM/DD/YYYY h:mm A'))
      .addField('Description', channel.topic || 'None')
    msg.channel.send(embed)
  }
}
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
const Commando = require('discord.js-commando')
const moment = require('moment')
const { MessageEmbed } = require('discord.js')
const filterLevels = {
  DISABLED: 'Off',
  MEMBERS_WITHOUT_ROLES: 'No Roles',
  ALL_MEMBERS: 'Scan Media From Everyone'
}
const verificationLevels = {
  NONE: 'None',
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  VERY_HIGH: 'Highest'
}

module.exports = class ServerInfoCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'server-info',
      group: 'info',
      memberName: 'server-info',
      aliases: ['guild-info'],
      description: 'Detailed Description of The Server',
      clientPermissions: ['EMBED_LINKS'],
      guildOnly: true,
    })
  }

  async run(msg) {
    if (!msg.guild.members.cache.has(msg.guild.ownerID)) await msg.guild.members.fetch(msg.guild.ownerID);
    const embed = new MessageEmbed()
      .setColor('#ff7824')
      .setTitle(`Information of ${msg.guild.name}`)
      .setThumbnail(msg.guild.iconURL({ format: 'png' }))
      .addField('Name', msg.guild.name)
      .addField('Server ID', msg.guild.id)
      .addField('Server Creation Date', moment.utc(msg.guild.createdAt).format('MM/DD/YYYY h:mm A'))
      .addField('Server Owner', `<@${msg.guild.owner.user.id}>`)
      .addField('Boost Count', msg.guild.premiumSubscriptionCount || 0)
      .addField('Boost Tier', msg.guild.premiumTier ? `Tier ${msg.guild.premiumTier}` : 'None')
      .addField('Region', msg.guild.region.toUpperCase())
      .addField('Explicit Filter', filterLevels[msg.guild.explicitContentFilter])
      .addField('Verification Level', verificationLevels[msg.guild.verificationLevel])
      .addField('Members', msg.guild.memberCount)
      .addField('Role Count', msg.guild.roles.cache.size)
      .addField('Channel Count', msg.guild.channels.cache.filter(channel => channel.type !== 'category').size)
    msg.channel.send(embed)
  }
}
