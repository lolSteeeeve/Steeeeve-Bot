const Commando = require('discord.js-commando')

module.exports = class PurgeNukeCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'purge',
      group: 'moderation',
      memberName: 'purge',
      description: 'Deletes up to 1000 messages from the current channel',
      guildOnly: true,
      clientPermissions: ['READ_MESSAGE_HISTORY', 'MANAGE_MESSAGES'],
      userPermissions: ['MANAGE_MESSAGES'],
      args: [
        {
          key: 'count',
          label: 'amount of messages',
          prompt: 'How many messages do you want to delete? Limit of up to 1000',
          type: 'integer',
          min: 1,
          max: 1000
        }
      ]
    })
  }

  async run(msg, { count }) {
    count++
    try {
      const messages = await msg.channel.messages.fetch({ limit: count > 1000 ? 1000 : count })
      await msg.channel.bulkDelete(messages, true)
      return null
    } catch {
      return msg.channel.send('Unable to delete Messages, The messages should be \`2 weeks\` old or \`younger\`')
    }
  }
}