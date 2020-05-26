class number{
	constructor(){
		this.executable = ["text"]
		this.role = config.roles.staff
		this.alias = ["numeros", "numbers"]
	}
	async execute (message, arg){
		if(Math.round(arg[1]) > 0&&Math.round(arg[1] <= 10)){
			delmsg(message)
			let msg = (await message.channel.messages.fetch({limit: 2})).last()
			for(var i=1; i<=arg[1]; i++){
				if(msg.deleted)return
				if(i==10)await msg.react('🔟')
				else await msg.react(i+'⃣')
			}
		}else message.channel.send("Tu dois mettre un nombre entre 1 et 10 !")
	}
}

module.exports.commands = { number }