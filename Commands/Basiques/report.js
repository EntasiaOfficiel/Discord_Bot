const config = require("entasia/config")
const {reportReact, askInformation } = require("../../Features/report")
const { MessageEmbed } = require("discord.js")

class report {
    constructor(){
        
    }
    async execute(message) {

        message.author.send("Hey ! Je vais t'aider dans ta démarches de report")
            .then(() => {
                message.channel.send("Regarde tes messages privés")
            })
            .catch(() => {
                return message.channel.send("Je ne peux pas t'envoyer de messages privés")
            })
        let reportedPlayer = await askInformation(message, "Quel est le pseudo de la personne que tu veux signaler ? :smile:")
            .catch(e => {return message.channel.send(e)})
        const reportReason = await askInformation(message, "Quelle est la raison du signalement ? :smiley: (tu peux ajouter un screen pour appuyer ton signalement)")
            .catch(e => {return message.channel.send(e)})
        if(reportReason || reportReason.msg) return
        const reason = reportReason.msg.content ? reportReason.msg.content : "Aucune raison spécifié"
        const embed = new MessageEmbed()
            .setAuthor("Report de " + message.author.username, message.author.avatarURL(), "http://"+message.author.id+".fr")
            .addField("Envers", reportedPlayer.msg.content)
            .addField("Raison", reason)

        if (reportReason.msg.attachments.first()) embed.addField("Fichier intégré au signalement", reportReason.msg.attachments.first().url)
        config.channels.reportcheck.send(embed).then(m => reportReact(m, reportedPlayer.msg.content, reason, reportReason.msg.attachments.first()))
        message.author.send("Ton report a bien été pris en compte, Merci")
    }

}

module.exports.commands = {report}