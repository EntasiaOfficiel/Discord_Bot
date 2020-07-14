const config = require("entasia/config")
const reportReact = require("../../Features/poukave")
const { MessageEmbed } = require("discord.js")
async function askInformation(message, askMessage = "Ce message ne devrait pas apparaitre, merci de contacter iTrooz_#2050 ou WeeskyBDW#6172", time = 30000, filter = (user => message.author.bot == false)) {
    if(!message) return console.log("[Erreur] Commande de report.js : le message n'a pas été spécifié dans la fonction ")
    return new Promise(async(resolve, reject) => {
        message.author.send(askMessage).then(async questionMsg => {

            const responce = await questionMsg.channel.awaitMessages(filter, {max: 1, time: time, errors: ['time']}).catch(async () => {
                reject(`Tu as mis trop de temps à faire ton signalement, merci de refaire .report dans ${config.channels.salon_bot}`)
            })
            if(!responce) return
            const msg = responce.array()[0]
            if(!msg) reject(`Tu as mis trop de temps à faire ton signalement, merci de refaire .report dans ${config.channels.salon_bot}`)
            if(msg.author.bot) return
            await resolve({questionMsg, msg})
        }).catch(() => {return message.reply(`Je ne peux pas t'envoyer de messages privés, merci de vérifier que tu acceptes les messages privés venant de ce serveur`)})
    })
}

class report {
    constructor(){}
    async execute(message, args) {
        try {
            await message.author.send("Hey ! Je vais t'aider dans ta démarches de report")
            message.channel.send("Regarde tes messages privés :smiley:")
        }
        catch(e) {}

        let reportedPlayer = await askInformation(message, "Quel est le pseudo de la personne que tu veux signaler ? :smile:").catch(e =>
        {
            return message.channel.send(e)
        })
        if(!reportedPlayer|| !reportedPlayer.msg) return
        const reportReason = await askInformation(message, "Quelle est la raison du signalement ? :smiley:").catch(e => {return message.channel.send(e)})
        if(!reportReason|| !reportReason.msg) return
        //console.log("debug 1 : " + reportedPlayer.msg.constructor + "\n" + "debug 2" + reportReason.msg)
        const embed = new MessageEmbed()
            .setAuthor("Report de " + message.author.username, message.author.avatarURL(), "http://"+message.author.id+".fr")
            .addField("Envers", reportedPlayer.msg.content)
            .addField("Raison", reportReason.msg.content)
        config.channels.reportcheck.send(embed).then(m => reportReact.reportReact(m, reportedPlayer.msg.content, reportReason.msg.content))
        await message.author.send("Ton report a bien été pris en compte, Merci")
    }

}

module.exports.commands = {report}