const Commando = require('discord.js-commando')

module.exports = class BanCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      group: 'moderation',
      memberName: 'ban',
      description: 'Bans a member from the guild',
      userPermissions: ['BAN_MEMBERS'],
      clientPermissions: ['BAN_MEMBERS'],
      guildOnly: true,
      args: [
        {
          key: 'user',
          prompt: 'Who do You want to **Ban**?',
          type: 'member'
        },
        {
          key: 'reason',
          prompt: 'Reason for the ban',
          type: 'string'
        },
        {
          key: 'days',
          prompt: 'Do You want to Delete their Message History? (0-7 Days)',
          type: 'integer',
          validate: n => {
            if (n > -1 && n < 8) {
              return true
            } else return 'The Number should be between 0 and 7'
          }
        }
      ]
    })
  }
  run(message, { user, reason, days }) {
    if (user.id == this.client.user.id) {
      return message.say('I Will not ban Myself')
    }
    if (user.id == message.author.id) {
      return message.say('You cant ban Yourself')
    }
    if (!user.bannable) {
      return message.say('Unable to ban, my role is too low for the hierarchy')
    }

    message.guild.members.ban(user, {
      reason: `Banned by ${message.author.tag}, Reason: ${reason}`,
      days
    })
      .then(() => {
        this.client.users.resolve(user.id).send(`You have been banned from \`${message.guild.name}\`, Reason: \`${reason}\``)
          .catch(() => void (0))

        message.say(`Banned ${user.user.tag}, Reason: "${reason}"`)
      })
      .catch(() => {
        message.say('Unable to ban, See if I Have Ban Members permisson or see if my role is at the top of the hierarchy')
      })
  }
}
