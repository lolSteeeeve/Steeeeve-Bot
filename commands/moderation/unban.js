const Commando = require('discord.js-commando')

module.exports = class UnbanCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'unban',
      group: 'moderation',
      memberName: 'unban',
      description: 'Unbans a member from the guild',
      guildOnly: true,
      clientPermissions: ['BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
      args: [
        {
          key: 'user',
          prompt: 'What user would you like to unban? (Use the user ID)',
          type: 'string'
        },

        {
          key: 'reason',
          prompt: 'Reason for the unban?',
          type: 'string',
          default: ''
        }
      ]
    })
  }

  async run(message, { user }, { reason }) {
    message.guild.fetchBan(user).then(ban => {
      if (ban) {
        message.guild.members.unban(ban.user, reason)
          .then(userB => console.log(`Unbanned \`${userB.username}\` from \`${message.guild.name}\``))
          .catch(console.error)
        message.channel.send(`${ban.user.username} has been unbanned from the server`)
      } else message.channel.send('Unable to unban/find this user')
    })
  }
}