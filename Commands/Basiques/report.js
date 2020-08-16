const config = require("entasia/config")
const {reportReact, askInformation } = require("../../Features/report")
const { MessageEmbed } = require("discord.js")

class report {
    constructor(){
        
    }
    async execute(message) {
        message.channel.send("Regarde tes messages privés :smile:")
        message.author.send("Hey ! Je vais t'aider dans ta démarches de report").catch(no)

        let reportedPlayer = await askInformation(message, "Quel est le pseudo de la personne que tu veux signaler ? :smile:")
            .catch(e => {return message.channel.send(e)})
        if(reportedPlayer == undefined || reportedPlayer.msg == undefined) return
        const reportReason = await askInformation(message, "Quelle est la raison du signalement ? :smiley: (tu peux ajouter un screen pour appuyer ton signalement)")
            .catch(e => {return message.channel.send(e)})
        if(reportReason == undefined || reportReason.msg == undefined) return
        const embed = new MessageEmbed()
            .setAuthor("Report de " + message.author.username, message.author.avatarURL(), "http://"+message.author.id+".fr")
            .addField("Envers", reportedPlayer.msg.content)
            .addField("Raison", reportReason.msg.content)

        if (reportReason.msg.attachments[0]) embed.addField("Fichier intégré au signalement", reportReason.msg.attachments.first().url)
        config.channels.reportcheck.send(embed).then(m => reportReact(m, reportedPlayer.msg.content, reportReason.msg.content))
        message.author.send("Ton report a bien été pris en compte, Merci")
    }

}

module.exports.commands = {report}