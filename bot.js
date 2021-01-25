const Commando = require('discord.js-commando')
const path = require('path')
const config = require('./config.json')

const client = new Commando.Client({
  commandPrefix: 's!',
  owner: '609259370131357696'
})

client.on('ready', () => {
  console.log(`yes`)
  client.user.setActivity(`s!help`, { type: 'LISTENING' })

  client.registry
    .registerDefaultTypes()
    .registerGroups([
      ['events', 'Events'],
      ['fun', 'Fun'],
      ['help', 'Help'],
      ['info', 'Information'],
      ['moderation', 'Moderation'],
      ['util', 'Utility'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
      help: false,
      ping: false,
      unknownCommand: false,
      prefix: false
    })
    .registerCommandsIn(path.join(__dirname, 'commands'))
})

client.login(config.token)