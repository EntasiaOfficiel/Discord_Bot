class idban{
	constructor(){
		this.executable = ["text"]
		this.perm = "BAN_MEMBERS"
		this.alias = ["banid"]
	}
    async execute (message, arg){
		let embed = new CustomEmbed([message.author.username, "idban"]).setType("error", "Erreur")
		if(arg[1]){
			if(new RegExp("^[0-9]{18}$").test(arg[1])){
				let r
				if(arg[2]) r = arg.slice(2).join(' ')
				else r = 'Raison non définie'
				message.guild.ban(arg[1],{ reason: r })
				embed.setDescription("Tentative de bannissement de l'utilisateur avec cette ID")
			}else embed.setDescription("Cet ID est invalide !")
		}else embed.setDescription("Met l'ID d'un utilisateur !")
		message.channel.send(embed)
    }
}

module.exports.commands = { idban }