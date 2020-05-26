const { MessageEmbed } = require('discord.js')


class CustomEmbed extends MessageEmbed {
	constructor(footer){
		super()
		if(footer){
			this.setColor('1a7edb')
			this.setCredits(footer)
		}
	}

	setHeader(text){
		this.setAuthor(text)
		return this
	}
	
	setCredits(name){
		if(name){
			if(typeof name == "string") name = [name]
			this.setFooter(name.join(" • "))
		}
		return this
	}

	addText(t,t2=1){
		if(this.description){
			var a = this.description
			for(let i=0; i<t2; i++)a+="\n"
			this.setDescription(a+t)
		}else this.setDescription(t)
		return this
	}

	setType(ask, text){
		if(!text)text = ""
		switch (ask){
			case "like":
				this.setAuthor(text, "https://files.entasia.fr/bots/like.png")
				break
			case "sync":
				this.setAuthor(text, "https://files.entasia.fr/bots/sync.png")
				break
			case "mod":
				this.setAuthor(text, "https://files.entasia.fr/bots/mod.png")
				break
			case "music":
				this.setAuthor(text, "https://files.entasia.fr/bots/musique.png")
				break
			case "eco":
				this.setAuthor(text, "https://files.entasia.fr/bots/eco.png")
				break
			case "error":
				this.setAuthor("Une erreur est survenue !", "https://files.entasia.fr/bots/erreur.png")
				this.setDescription(text)
				break
			case "perm":
				this.setAuthor(text, "https://files.entasia.fr/bots/perms.png")
				break
			case "log":
				this.setAuthor(text, "https://files.entasia.fr/bots/log.png")
				break
			default:
				this.setAuthor(text)
		}
		return this
	}
}


module.exports = CustomEmbed