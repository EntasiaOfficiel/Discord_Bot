const Sanctions = require("entasia/Sanctions")

class check{
	constructor(){
		this.role = config.roles.staff
	}
	async execute (message, arg){
		if(arg[1]){
			databases.SQL.query("SELECT * FROM sanctions.actuals WHERE `on`=?", [arg[1]], (err, result, fields) => {
				if(err)throw err
				let ban_se, mute_se
				for(let i of result){
					if(i.type=="0")ban_se = i
					else if(i.type=="1")mute_se = i
				}
				let embed = new CustomEmbed([message.author.username, "check"]).setType("mod", "Sanctions du joueur "+arg[1]+" :")
				
				if(ban_se){
					embed.addField("Banni", "Oui (données ci-dessous)")
					Sanctions.addSanction(embed, ban_se)
				}else embed.addField("Banni", "Non")
				
				if(mute_se){
					embed.addField("Muté", "Oui (données ci-dessous)")
					Sanctions.addSanction(embed, mute_se)
				}else embed.addField("Muté", "Non")
				message.channel.send(embed)
			})
		}else message.channel.send("Met un nom d'utilisateur !") 
	}
}

module.exports.commands = { check }