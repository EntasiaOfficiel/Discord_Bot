const request = require('request')

class onlines{
	constructor(){
		this.alias = ["online"]
	}
    execute (message){
		let players = ''
		if(vars.totalonlines.length==1){
			players = "1 joueur"
		}else{
			players = vars.totalonlines.length+" joueurs"
		}

		if(vars.totalonlines.length!=0){
			players = players + " : \n"+vars.totalonlines.join(", ")
		}
		message.channel.send(`Connectés actuellement sur le serveur : ${players}`)			
    }
}

module.exports.commands = { onlines }