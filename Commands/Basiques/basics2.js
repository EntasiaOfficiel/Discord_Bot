class members{
	constructor(){
		this.alias = ["member"]
	}
    execute(message){
		message.channel.send("Nous sommes **"+message.guild.memberCount+"** !")
	}
}

class ip{
	constructor(){
	}
    execute(message){
		message.channel.send("Voici l'IP du serveur Entasia ! play.entasia.fr")
	}
}

class discord{
	constructor(){
	}
    async execute(message){
		let invite = (await config.channels.accueil.fetchInvites()).first()
		if(!invite) invite = await config.channels.accueil.createInvite({maxAge: 0, unique: true})
		message.channel.send("Le lien du Discord est : "+invite)
	}
}

const quizix = config.entasia.members.cache.get("372295146987061250")

class credits{
	constructor(){
		this.alias = ["credit"]
	}
    execute(message){
		message.channel.send(new CustomEmbed([message.author.username, "credits"]).setHeader("Crédits du bot :")
		.setColor('00ffad')
		.addField(config.owner.tag, "Développement du bot")
		.addField(quizix.user.tag, "Images/Emotes utilisées par le bot")
		)
	}
}


module.exports.commands = { discord, ip, members, credits }