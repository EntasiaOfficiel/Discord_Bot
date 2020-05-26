class ping{
	constructor(){
		this.alias = ["pong"]
	}
	async execute (message){
		var m = await message.channel.send("Pong ! Calcul de la latence..")
		m.edit(`Pong ! Ma latence est de **${m.createdTimestamp - message.createdTimestamp}ms** ! ( Latence automatique : **${Math.round(bot.ws.ping)}ms** )`);
    }
}

module.exports.commands = { ping }