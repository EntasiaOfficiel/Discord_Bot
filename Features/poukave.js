config.channels.report.createMessageCollector((message) => {
	if(message.author.bot||message.system)return
	delmsg(message)
	message.author.send("Merci de ta dénonciation ! le Staff y jettera bientôt un oeil !").catch(no)
	config.channels.reportcheck.send(new CustomEmbed("Report de "+message.author.username)
	.setAuthor(message.author.username, message.author.avatarURL, "http://"+message.author.id+".fr")
	.setDescription(message.content))
	.then((m)=> reportReact(m))
})

async function reportReact(message, reportedPlayer, reportReason){
	await message.react("✅")
	await message.react("❌")
	await message.react("🤐")
	var collector = message.createReactionCollector((reaction, user) => {
		if(user.bot)return
		let u = message.guild.members.cache.get(message.embeds[0].author.url.substr(7, 18))
		if(u){
			collector.stop()
			delmsg(message)
			let embed = new CustomEmbed("Logs").setType("Log", "Rapport de dénonciation")
			if(reaction.emoji.name == "✅"){
				embed.addField("Status", "Dénonciation acceptée")
				u.user.send("Ton report à été vu et déclaré vrai par le staff ! :slight_smile:")
			}else if(reaction.emoji.name == "❌"){
				u.user.send("Ton report à été vu et déclaré invalide ! :slight_frown: ")
				embed.addField("Status", "Dénonciation refusé")
			}else embed.addField("Status", "Dénonciation étouffée")
			embed.addField("de", u.user.tag)
			embed.addField("envers", reportedPlayer)
			embed.addField("raison", reportReason)
			functions.logInfo(embed)
		}
	})
}

config.channels.reportcheck.messages.fetch({limit: 100}).then((data)=>{
		for(let [id, msg] of data){
			if(msg.embeds.length==0)delmsg(msg)
			else reportReact(msg)
		}
})

module.exports.reportReact = reportReact