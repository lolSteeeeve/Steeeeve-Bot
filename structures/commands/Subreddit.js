const request = require('node-superfetch')
const Commando = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const { formatNumberK, shorten } = require('../../util/Util')

module.exports = class SubredditCommand extends Commando.Command {
	constructor(client, info) {
		super(client, info)

		this.postType = info.postType ? Array.isArray(info.postType) ? info.postType : [info.postType] : null
	}

	async run(msg, { subreddit }, fromPattern) {
		if (fromPattern) {
			if (msg.guild && !msg.channel.permissionsFor(this.client.user).has('SEND_MESSAGES')) return null
			subreddit = msg.patternMatches[1]
		}
		if (!subreddit) subreddit = typeof this.subreddit === 'function' ? this.subreddit() : this.subreddit
		try {
			const post = await this.random(subreddit, msg.channel.nsfw)
			if (!post) return msg.say('Unable to find any results')
			return msg.say(this.generateText(post.post, post.origin, post.icon))
		} catch (err) {
			if (err.status === 403) return msg.say('This subreddit is private')
			if (err.status === 404) return msg.say('Could not find any results')
			return msg.say(`An error occurred: \`${err.message}\``)
		}
	}

	generateText() {
		throw new Error('The generateText method is required')
	}

	makeEmbed(post) {
		const embed = new MessageEmbed()
			.setColor('RANDOM')
			.setTitle(shorten(post.title, 256))
			.setImage(post.post_hint === 'image' ? post.url : null)
			.setURL(`https://www.reddit.com${post.permalink}`)
			.setFooter(`👍 ${formatNumberK(post.ups)}`)
		if (post.thumbnail && post.thumbnail !== 'self' && post.thumbnail !== 'default' && post.post_hint !== 'image') {
			embed.setThumbnail(post.thumbnail)
		}
		return embed
	}

	async random(subreddit, nsfw) {
		let icon = null
		const { body } = await request
			.get(`https://www.reddit.com/r/${subreddit}/hot.json`)
			.query({ limit: 100 })
		if (!body.data.children.length) return null
		const posts = body.data.children.filter(post => {
			if (!post.data) return false
			if (!nsfw && post.data.over_18) return false
			return (this.postType ? this.postType.includes(post.data.post_hint) : true) && post.data.url && post.data.title
		})
		if (!posts.length) return null
		if (this.getIcon) icon = await this.fetchIcon(subreddit)
		return {
			origin: subreddit,
			post: posts[Math.floor(Math.random() * posts.length)].data,
			icon
		}
	}

	async fetchIcon(subreddit) {
		const { body } = await request.get(`https://www.reddit.com/r/${subreddit}/about.json`)
		if (!body.data.icon_img && !body.data.community_icon) return 'https://i.imgur.com/DSBOK0P.png'
		return body.data.icon_img || body.data.community_icon.replace(/\?.+/, '')
	}
}
