// logger(config.channels.pub)

config.channels.pub.createMessageCollector((message) => {
	if(message.author.bot||message.system)return
	functions.deleteMessage(message)
	if(message.content.length < 1)
		return message.author.send("Pour pouvoir être validé , ton message doit faire plus de 350 caractères ! ( C'est pas si long que ca en à l'air , essaye et tu verra ^^ )").catch(no)
	
		message.author.send("Bonjour ! Juste un petit mot pour te dire que le staff regardera bientôt ta publicité. Tu recevra un message quand elle sera validée ou refusée ( ce que je ne te souhaite pas bien évidemment ^^ ) ! :smile:").catch(no)
		config.channels.pubcheck.send(new CustomEmbed("publicité de "+message.author.username)
		.setAuthor(message.author.username, message.author.avatarURL, "http://"+message.author.id+".fr")
		.setDescription(message.content))
		.then((m)=> pubReact(m))
})



async function pubReact(message){
	if(!message.embeds[0]) return functions.deleteMessage(message)
	await message.react(config.emojis.oui)
	await message.react(config.emojis.non)
		
	let collector = message.createReactionCollector(async (reaction, user)=>{
		if(user.bot)return
		let a
		if(reaction.emoji.id==config.emojis.oui.id)a=true
		else if(reaction.emoji.id==config.emojis.non.id)a=false
		else return reaction.remove(user)

		let b = await reaction.fetchUsers()
		if(b.size <= 1)return
		functions.deleteMessage(message)
		collector.stop()
		let u = message.guild.members.get(message.embeds[0].author.url.substr(7, 18))
		if(a){
			config.channels.pub.send(new CustomEmbed("publicité de "+message.embeds[0].author.name)
				.setDescription(message.embeds[0].description)
				.setAuthor(message.embeds[0].author.name, message.embeds[0].author.iconURL))
			u.user.send("Félicitations ! Ta publicité vient d'être publiée :slight_smile:")
			
		}else u.user.send("Je suis désolé , ta publicité à été refusée par le Staff :cry: ")
	})
}



config.channels.pubcheck.messages.fetch({limit: 100}).then((data)=>{
	for(let [id, msg] of data){
		if(msg.embeds.length==0)delmsg(msg)
		else pubReact(msg)
	}
})