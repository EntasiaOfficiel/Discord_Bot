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

async function askInformation(message, askMessage = "Ce message ne devrait pas apparaitre, merci de contacter iTrooz_#2050 ou WeeskyBDW#6172", time = 30000, filter = (user => message.author.bot == false)) {
	if(message === undefined) return console.log("[Erreur] Commande de report.js : le message n'a pas été spécifié dans la fonction ")
	return new Promise(async(resolve, reject) => {
		message.author.send(askMessage).then(async questionMsg => {

			const responce = await questionMsg.channel.awaitMessages(filter, {max: 1, time: time, errors: ['time']}).catch(async () =>  {
				reject(`Tu as mis trop de temps à faire ton signalement, merci de refaire .report dans ${config.channels.salon_bot}`)
				return
			})
			if(responce == undefined) return
			const msg = responce.array()[0]
			if(msg.author.bot) return
			if(msg == undefined) reject(`Tu as mis trop de temps à faire ton signalement, merci de refaire .report dans ${config.channels.salon_bot}`)
			await resolve({questionMsg, msg})
		}).catch(() => {return message.reply(`Je ne peux pas t'envoyer de messages privés, merci de vérifier que tu acceptes les messages privés venant de ce serveur`)})
	})
}

module.exports = { reportReact, askInformation}