const SubredditCommand = require('../../structures/commands/Subreddit')
const { list } = require('../../util/Util')
const subreddits = require('../../assets/json/aww')

module.exports = class AwwCommand extends SubredditCommand {
	constructor(client) {
		super(client, {
			name: 'aww',
			group: 'fun',
			memberName: 'aww',
			description: 'Cute',
      clientPermissions: ['EMBED_LINKS'],
			details: `**Subreddits:** ${subreddits.join(', ')}`,
			postType: 'image',
			getIcon: true,
			args: [
				{
					key: 'subreddit',
					prompt: `What subreddit do you want to get memes from? Either ${list(subreddits, 'or')}.`,
					type: 'string',
					oneOf: subreddits,
					default: () => subreddits[Math.floor(Math.random() * subreddits.length)],
					parse: subreddit => subreddit.toLowerCase()
				}
			]
		})
	}

	generateText(post, subreddit, icon) {
		return this.makeEmbed(post, subreddit, icon)
	}
}
