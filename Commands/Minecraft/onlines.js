const request = require('request')

class onlines{
	constructor(){
		this.alias = ["online"]
	}
    execute (message, args){
		if(args[1]){
			let n = args[1].toLowerCase()
			for(let k in vars.onlines){
				if(n==k.toLowerCase()){
					let v = vars.onlines[k]
					let s = v == 1 ? "" : "s" 
					message.channel.send(`Connecté${s} actuellement sur **${args[1]}** : ${v} joueur${s}`)	
					return
				}
			}
			message.channel.send(`Serveur ${args[1]} introuvable !`)
		}else{
			let players = ''
			let s
			if(vars.totalonlines.length==1){
				s = ""
				players = "1 joueur"
			}else{
				s = "s"
				players = vars.totalonlines.length+" joueurs"
			}

			if(vars.totalonlines.length!=0){
				players = players + " : \n"+vars.totalonlines.join(", ")
			}
			message.channel.send(`Connecté${s} actuellement sur le serveur : ${players}`)	
		}		
    }
}

module.exports.commands = { onlines }