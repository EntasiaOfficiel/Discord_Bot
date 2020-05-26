var talktod = []

class talkto{
	constructor(){
		this.executable = ["dm"]
		this.owner = true
	}
  async execute (message, arg){
	if(!arg[1])return message.channel.send("Vous devez mentionner une personne !")
	if(arg[1] == "stop"){
		if(!talktod[message.author.id])return message.channel.send("Tu n'a pas de conversation avec quelqu'un !")
		let user = talktod[message.author.id].sendto
		message.channel.send("Conversation avec "+user.username+" terminée !")
		if(talktod[user.id].sendto.id == message.author.id){
			user.send("**Conversation terminée !**")
			talktod[user.id].stop()
			delete talktod[user.id]
		}
		talktod[message.author.id].stop()
		delete talktod[message.author.id]
		return
	}
	var user = bot.users.cache.get(arg[1])
	if(!user)return message.channel.send("Cet utilisateur n'existe pas !")
	if(user.bot)return message.channel.send("Cet utilisateur est un bot !")
	if(!user.dmChannel)await user.createDM()
	if(!message.author.dmChannel)await message.author.createDM()
	message.reply("Tu parle maintenant à **"+user.username+"** !")

	talktod[user.id] = user.dmChannel.createMessageCollector((message) => {
		if(message.author.bot||message.system||message.content.startsWith(".talkto"))return
		talktod[user.id].sendto.send(message.content)
	})
	talktod[message.author.id] = message.author.dmChannel.createMessageCollector((message) => {
		if(message.author.bot||message.system||message.content.startsWith(".talkto"))return
		talktod[message.author.id].sendto.send(message.content)
	})
	talktod[message.author.id].sendto = user
	talktod[user.id].sendto = message.author
	}
}

module.exports.commands = { talkto }