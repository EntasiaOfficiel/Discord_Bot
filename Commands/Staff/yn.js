class yn{
	constructor(){
		this.executable = ["text"]
		this.role = config.roles.staff
		this.alias = ["yesno"]
	}
	async execute (message){
		// delmsg(message)
		
		let msg = (await message.channel.messages.fetch({limit: 2})).last()
		delmsg(message)
		await msg.react(config.emojis.oui)
		.catch(no)
		await msg.react(config.emojis.non)
		.catch(no)
	}
}

module.exports.commands = { yn }