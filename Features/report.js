async function reportReact(message, reportedPlayer, reportReason, attachment){
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
			if (attachment) embed.addField("Fichier intégré au signalement", attachment)
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

async function sendPM(msg, text) {
	return await msg.author.send(text).catch(()=>{
		msg.channel.send("Je ne peux pas t'envoyer de message privé ! Vérifie que tu acceptes bien les MPs des membres d'Entasia")
	})
}

async function askInformation(message, text, dynamicFilter = () => true) {
	return new Promise(async(resolve, reject) => {
		let questionMsg = await sendPM(message, text)
		if(questionMsg==null) return reject()
		
		let response = await questionMsg.channel.awaitMessages((msg)=>{
			if(msg.author.bot)return false
			if(msg.system)return false
			return dynamicFilter(msg)
		}, {max: 1, time: 30000})
		if(response){
			let msg = response.array()[0]
			if(msg)	return resolve(msg)
			
		}
		return reject(`Tu as mis trop de temps à faire ton signalement, merci de refaire .report dans ${config.channels.salon_bot}`)
		
	})
}

module.exports = { sendPM, reportReact, askInformation }