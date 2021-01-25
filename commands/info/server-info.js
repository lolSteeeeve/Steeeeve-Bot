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