const Commando = require('discord.js-commando')
const request = require('node-superfetch')
const { MessageEmbed } = require('discord.js')
const { formatNumber } = require('../../util/Util')

module.exports = class Covid19Command extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'covid',
      group: 'events',
      memberName: 'covid',
      description: 'Stats for COVID-19',
      clientPermissions: ['EMBED_LINKS'],
      args: [
        {
          key: 'country',
          prompt: 'What country do you want to get the stats for? Type `all` to get world stats.',
          type: 'string',
          default: 'all',
          parse: country => encodeURIComponent(country)
        }
      ]
    })
  }

  async run(msg, { country }) {
    try {
      const data = await this.fetchStats(country)
      const embed = new MessageEmbed()
        .setColor('#e01616')
        .setTitle(`Stats for ${country === 'all' ? 'The World' : data.country}`)
        .setURL(country === 'all'
          ? 'https://www.worldometers.info/coronavirus/'
          : `https://www.worldometers.info/coronavirus/country/${data.countryInfo.iso2}/`)
        .setThumbnail(country === 'all' ? null : data.countryInfo.flag || null)
        .setFooter('Last Updated')
        .setTimestamp(data.updated)
        .addField('Total Cases', `${formatNumber(data.cases)} (${formatNumber(data.todayCases)} Today)`)
        .addField('Total Deaths', `${formatNumber(data.deaths)} (${formatNumber(data.todayDeaths)} Today)`)
        .addField('Total Recoveries',
          `${formatNumber(data.recovered)} (${formatNumber(data.todayRecovered)} Today)`)
        .addField('Active Cases', formatNumber(data.active))
        .addField('Active Critical Cases', formatNumber(data.critical))
        .addField('Tests', formatNumber(data.tests))
      return msg.embed(embed)
    } catch (err) {
      if (err.status === 404) return msg.say('Unable to find the country')
      return msg.channel.send(`An error occurred: \`${err.message}\``)
    }
  }

  async fetchStats(country) {
    const { body } = await request
      .get(`https://disease.sh/v3/covid-19/${country === 'all' ? 'all' : `countries/${country}`}`)
    return body
  }
}
