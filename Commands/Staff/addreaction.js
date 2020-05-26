class addreaction{
	constructor(){
		this.executable = ["text"]
		this.role = config.roles.staff
		this.alias = ["addreact", "addreac"]
	}
	async execute (message, arg){
		delmsg(message)
		if(arg[1]){
			let msg
			if(arg[2]){
				await message.channel.messages.fetch(arg[2])
				.catch(no)
				.then(a =>{
					msg = a
				})
				
				if(!msg) return message.channel.send("Message non trouvé !")

			}else msg = (await message.channel.messages.fetch({limit: 2})).last()
			
			let emote
			if(arg[1].startsWith("<")){
				let em = arg[1].substring(1, arg[1].length-1).split(":")[1]
				for(var [k, i] of message.guild.emojis.cache){
					if(i.name==em){
						emote = k
						break
					}
				}
			}
			else emote = arg[1]
			
			if(emote){
				msg.react(emote)
				.catch(no)
			}
		}
	}
}

module.exports.commands = { addreaction }