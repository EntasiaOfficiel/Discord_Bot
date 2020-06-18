var data = []

class talkto{
	constructor(){
		this.executable = ["dm"]
		this.owner = true
	}
  	async execute (message, arg){
		if(!arg[1])return message.channel.send("Tu dois mentionner une personne !")
		if(arg[1] == "stop"){
			if(data[message.author.id]){
				let user = data[message.author.id].sendto
				if(user){
					data[user.id].stop()
					delete data[user.id]
				}
				data[message.author.id].stop()
				delete data[message.author.id]
				message.channel.send("Conversation terminée !")
			}else message.channel.send("Tu n'as pas de conversation actuellement !")
		}else{
			if(data[message.author.id])return "Tu as déja une conversation actuellement ! Fait .talkto stop pour l'arrêter"
			let user = bot.users.cache.get(arg[1])
			if(user){
				if(user.bot)return message.channel.send("Cet utilisateur est un bot !")
				if(!message.author.dmChannel)await message.author.createDM()
				if(!user.dmChannel)await user.createDM()
				message.reply("Tu parle maintenant à **"+user.username+"** !")
			
				data[user.id] = user.dmChannel.createMessageCollector((message) => {
					if(message.author.bot||message.system||message.content.startsWith(".talkto"))return
					data[user.id].sendto.send(message.content)
				})
				data[message.author.id] = message.author.dmChannel.createMessageCollector((message) => {
					if(message.author.bot||message.system||message.content.startsWith(".talkto"))return
					data[message.author.id].sendto.send(message.content)
				})
				data[message.author.id].sendto = user
				data[user.id].sendto = message.author
			}else{
				let channel = bot.channels.cache.get(arg[1])
				if(!channel)return message.channel.send("ID invalide (pas d'user/channel)")

				if(!message.author.dmChannel)await message.author.createDM()
				message.reply("Tu parles maintenant sur le channel **"+channel.name+"** !")
			
				data[message.author.id] = message.author.dmChannel.createMessageCollector((message) => {
					if(message.author.bot||message.system||message.content.startsWith(".talkto"))return
					channel.send(message.content)
				})

			}
		}
	}
}

module.exports.commands = { talkto }