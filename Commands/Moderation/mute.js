const ModAPI = require('entasia/ModAPI').functions
const { mute_cache } = require('entasia/ModAPI').variables
const { timeToSeconds, secondsToTime } = require('entasia/GlobalAPI').functions


class mute{
	constructor(){
		this.executable = ["text"]
		this.role = config.roles.staff
	}
	errMsg (message, text){
		message.channel.send(new CustomEmbed([message.author.username, "mute"])
		.setType("error", "Erreur")
		.setDescription(text))
	}

	execute (message, arg){
		if(arg[1]){
			let target
			if (message.mentions.users.size == 0) target = message.guild.members.cache.get(arg[1])
			else target = message.mentions.members.first()
			if(target){
				let time=0
				let reason = ''
				if(arg[2]){
					if(arg[2]=="def"||arg[2]=="-1"){
						time = -1
					}else{
						time = timeToSeconds(arg[2])
						if(time==0)time = -1
						else if(time>29030400)return this.errMsg(message, "Le temps maximum est d'une année !")
					}
					
					reason = arg.splice(3).join(' ')

					if((target.roles.cache.has(config.roles.staff.id)&&!message.member.roles.cache.has(config.roles.bigstaff.id))){
						this.errMsg(message, "Cette personne est un membre du Staff ! :rage:")
					}else{
						let embed = new CustomEmbed([message.author.username, "mute"])
						.setHeader("Mute appliqué ")

						embed.addField("Utilisateur : ", target.user)

						if(reason)embed.addField("Raison : ", reason)

						let t
						if(time==-1) t = "Durée indéterminée"
						else t = secondsToTime(time)
						embed.addField("Temps : ", t)

						if(mute_cache[target.id]){
							if(mute_cache[target.id].reason)embed.addField("Ancienne raison : ", mute_cache[target.id].reason)

							let ti
							if(mute_cache[target.id].time==-1)ti="Durée indeterminée"
							else ti = secondsToTime(mute_cache[target.id].time)
							embed.addField("Ancien temps : ", ti)
							
						}
						ModAPI.mute(target, message.member, time, reason)
	
						message.channel.send(embed)
					}
				}else this.errMsg(message, "Tu dois mettre un temps !")
			}else this.errMsg(message, "Le joueur "+arg[1]+" n'existe pas !")
			
		}else this.errMsg(message, "Met la personne que tu veux muter en argument !")
	}
}

module.exports.commands = { mute }