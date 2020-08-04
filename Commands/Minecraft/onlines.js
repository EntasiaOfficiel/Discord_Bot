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
			let data = ''
			let s
			if(vars.totalonlines.length==1){
				s = ""
				data = "1 joueur"
			}else{
				s = "s"
				data = vars.totalonlines.length+" joueurs"
			}

			if(vars.totalonlines.length!=0){
				data = data + " : \n"+vars.totalonlines.join(", ").replace("*", "\\*").replace("_", "\\_")
			}
			message.channel.send(`Connecté${s} actuellement sur le serveur : ${data}`)
		}		
    }
}

module.exports.commands = { onlines }