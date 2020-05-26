class restart{
	constructor(){
		this.executable = ["text"]
		this.owner = true
		this.alias = ["reboot"]
	}
	async execute (message){
		await message.channel.send("Redémarrage !")
		process.exit()
	}
}

module.exports.commands = { restart }