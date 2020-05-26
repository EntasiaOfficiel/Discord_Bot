config.channels.roles.messages.fetch({limit: 10})

bot.on("messageReactionAdd", async (reaction, user)=>{
	if(user.bot||reaction.message.channel.id!=config.channels.roles.id)return
	let role = config.roles_reacts[reaction.emoji.name]
	if(role){
		let member = reaction.message.channel.guild.members.cache.get(user.id)
		if(member!=undefined){
			// console.log("en cours")
			await member.roles.add(role)
			// console.log(r)
		}
	}
})

bot.on("messageReactionRemove", async (reaction, user)=>{
	if(user.bot||reaction.message.channel.id!=config.channels.roles.id)return
	let role = config.roles_reacts[reaction.emoji.name]
	if(role){
		let member = reaction.message.channel.guild.members.cache.get(user.id)
		if(member!=undefined){
			// console.log("en cours")
			await member.roles.remove(role)
			// console.log(r)
		}
	}
})