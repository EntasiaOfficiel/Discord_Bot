class number{
	constructor(){
		this.executable = ["text"]
		this.role = config.roles.staff
		this.alias = ["numeros", "numbers"]
	}
	async execute (message, arg){
		if(Math.round(arg[1]) > 0&&Math.round(arg[1] <= 10)){
			delmsg(message)
			for(i of (await message.channel.fetchMessages({ limit: 2 })).array())if(i.id != message.id){var m = i;break}
			for(var i=1; i<=arg[1]; i++){
				if(m.deleted)return
				if(i==10)await m.react('🔟')
				else await m.react(i+'⃣')
			}
		}else message.channel.send("Tu dois mettre un nombre entre 1 et 10 !")
	}
}

module.exports.commands = { number }