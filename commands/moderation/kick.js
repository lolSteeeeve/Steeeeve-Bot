const Commando = require('discord.js-commando')

module.exports = class KickCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      group: 'moderation',
      memberName: 'kick',
      description: 'Kicks a member from the guild',
      guildOnly: true,
      userPermissions: ['KICK_MEMBERS'],
      clientPermissions: ['KICK_MEMBERS'],
      args: [
        {
          key: 'member',
          prompt: 'Who do you want to **kick**?',
          type: 'member'
        },
        {
          key: 'reason',
          prompt: 'Reason for kick',
          type: 'string'
        }
      ]
    })
  }

  run(message, { member, reason }) {
    if (member.id == this.client.user.id) {
      return message.say('I will not kick myself')
    }
    if (member.id == message.author.id) {
      return message.say('You cant kick yourself')
    }
    if (!member.bannable) {
      return message.say('Unable to kick, my role is too low for the hierarchy')
    }

    reason = reason.length ? reason : 'No reason provided'

    member.kick(`Kicked by ${message.author.tag}, Reason: ${reason}`)
      .then(() => {
        this.client.users
          .resolve(member.id)
          .send(`You have been kicked from \`${message.guild.name}\`, Reason: \`${reason}\``)
          .catch(() => void 0)

        message.say(`Kicked ${member.user.tag}, Reason: "${reason}"`)
      })
      .catch(() => {
        message.say('Unable to kick, See if I Have Kick Members permisson or see if my role is at the top of the hierarchy')
     })
  }
}