class addreaction{
	constructor(){
		this.executable = ["text"]
		this.role = config.roles.staff
		this.alias = ["addreact", "addreac"]
	}
	async execute (message, arg){
		delmsg(message)
		if(arg[1]){
			if(arg[2]){
				await message.channel.fetchMessage(arg[2])
				.catch(no)
				.then(a =>{
					if(a) m = a
				})
				if(!m){
					for(var [k, v] of message.guild.channels){
						if(v.type != "text")continue
						await v.fetchMessage(arg[2])
						.catch(no)
						.then(a =>{
							if(a)m = a
						})
						if(m)break
					}
				}
				if(!m){
					message.channel.send("Message non trouvé !")
					return
				}
			}else for(i of (await message.channel.fetchMessages({ limit: 2 })).array())if(i.id != message.id){var m = i;break}
			if(arg[1].startsWith("<")){
				var em = arg[1].substring(1, arg[1].length -1)
				var em = arg[1].split(":")[1]
			}else var em = arg[1]
			
			for(var [k, i] of message.guild.emojis){
				if(i.name==em){
					var em = k
					break
				}
			}
			m.react(em)
			.catch(this.no)
		}
	}
}

module.exports.commands = { addreaction }