const config = require("entasia/config")
const {sendPM, reportReact, askInformation } = require("../../Features/report")

class report {
	async execute(message) {
		let t = await sendPM(message, "Hey ! Je vais t'aider dans ta démarche de report")
		if(!t)return
		message.channel.send("Regarde tes messages privés :smile:")
		let reportedPlayer = await askInformation(message, "Quel est le pseudo de la personne que tu veux signaler ? :face_with_monocle:",
		(msg)=>{
			if (msg.content)return true
			else{
				message.author.send("Tu dois spécifier un joueur ! Les screenshots ne sont pas autorisés comme pseudos de joueur")
				return false
			}
		})
		.catch(e => {message.channel.send(e)})
		if(!reportedPlayer) return

		let reportReason = await askInformation(message, "Quelle est la raison du signalement ? :abc: (tu peux ajouter un screen pour appuyer ton signalement)")
		.catch(e => message.channel.send(e))
		if(!reportReason) return

		let reason = reportReason.content||"Aucune raison spécifié"
		let embed = new CustomEmbed()
			.setAuthor("Report de " + message.author.username, message.author.avatarURL(), "http://"+message.author.id+".fr")
			.addField("Envers", reportedPlayer.content)
			.addField("Raison", reason)
		if (reportReason.attachments.first()) embed.addField("Fichier intégré au signalement", reportReason.attachments.first().url)

		config.channels.reportcheck.send(embed).then(m => reportReact(m, reportedPlayer.content, reason, reportReason.attachments.first()))
		message.author.send("Ton report a bien été pris en compte, Merci !")
	}

}

module.exports.commands = {report}