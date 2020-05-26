class test{
    constructor(){
        this.owner = true
    }
    async execute (message){
        let d = Date.now()
        console.log("en cours..")
        await message.member.roles.add(config.roles_reacts.mcpingwave)
        console.log((Date.now()-d)+"ms")

        // message.reply(socket.sendData("socket version"))
    }
}

module.exports.commands = { test }