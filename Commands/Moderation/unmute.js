const unmutef = require('entasia/ModAPI').functions.unmute
const { mute_cache } = require('entasia/ModAPI').variables

class unmute{
	constructor(){
		this.executable = ["text"]
		this.role = config.roles.staff
		this.alias = ["demute"]
	}
	async execute (message, arg){
		let embed = new CustomEmbed([message.author.username, "unmute"]).setType("error", "Erreur")
		if(arg[1]){
			let target
			if (message.mentions.users.size == 0) target = message.guild.members.cache.get(arg[1])
			else target = message.mentions.members.first()
			if(target){
				if(mute_cache[target.id]){
					embed.setType("Mod"," Unmute")
					unmutef(target)
					embed.setDescription("Tu as démuté "+target.user.username+" !")
				}else embed.setDescription("Ce joueur n'est pas muté !")
			}else embed.setDescription("Ce joueur n'existe pas !")
		}else embed.setDescription("Choisis un joueur !")
		message.channel.send(embed)
	}
}

module.exports.commands = { unmute }
