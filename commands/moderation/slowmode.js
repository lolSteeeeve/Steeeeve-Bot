const Commando = require('discord.js-commando')

module.exports = class SlowCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'slowmode',
      group: 'moderation',
      memberName: 'slowmode',
      userPermissions: ['MANAGE_CHANNELS'],
      description: 'Changes the slowmode duration for a channel',
      guildOnly: true,
      clientPermissions: ['MANAGE_CHANNELS'],
      argsType: 'multiple',
    })
  }

  run = (message, args) => {
    const { channel } = message

    if (args.length < 1) {
      message.say('Please provide a duration')
      return
    }

    let duration = args.shift().toLowerCase()
    if (duration === 'off') {
      duration = 0
    }

    if (isNaN(duration)) {
      message.say('Please provide either a number of seconds or the word \"off\"')
      return
    }

    channel.setRateLimitPerUser(duration, args.join(' '))
    message.say(`The slowmode for this channel has been set to **${duration}**`)
  }
}