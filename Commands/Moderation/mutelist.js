const { mute_cache } = require('entasia/ModAPI.js').variables
const { secondsToTime } = require('entasia/GlobalAPI.js').functions


class mutelist{
	constructor(){
		this.executable = ["text"]
		this.role = config.roles.staff
	}
	execute (message){
		let embed = new CustomEmbed([message.author.username, "mutelist"]).setType("mod", "Liste des mutés")
		for(let i in mute_cache){
			
			let desc = []

			if(mute_cache[i].on.user == undefined){
				let u = config.entasia.members.cache.get(mute_cache[i].on)
				if(u)mute_cache[i].on.user = u
			}
			let u1
			let u2
			if(mute_cache[i].on.user == undefined){
				u1 = "**Non présent** "+mute_cache[i].on_name
				u2 = "ID="+mute_cache[i].on
			}else{
				u1 = mute_cache[i].on.user.tag
				u2 = mute_cache[i].on.toString()
			}
			desc.push("Utilisateur : "+u2)
			
			let b
			if(mute_cache[i].by.user == undefined)b = "ID="+mute_cache[i].by
			else b = mute_cache[i].by.toString()
			desc.push("Par : "+b)

			
			let t
			if(mute_cache[i].time==-1)desc.push("Temps restant : Indéterminé")
			else{
				desc.push("Temps de mute : "+secondsToTime(mute_cache[i].time))


				t = (mute_cache[i].when+mute_cache[i].time)-Date.now()/1000
				if(t<=0)desc.push("Temps de mute écoulé !")
				else{
					t = secondsToTime((mute_cache[i].when+mute_cache[i].time)-Date.now()/1000)
					desc.push("Temps restant : "+t)
				}
			}
			
			let r = "Indeterminée"
			if(mute_cache[i].reason)r = mute_cache[i].reason
			desc.push("Raison : "+r)
			

			embed.addField(u1, desc.join("\n"))
		}
		if(embed.fields[0]){
			embed.setDescription("Liste des mutés actuellement :")
		}else embed.setDescription("Il n'y a aucun muté actuellement !")
		message.channel.send(embed)
	}
}

module.exports.commands = { mutelist }