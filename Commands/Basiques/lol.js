class lol{
	constructor(){
        this.role = config.roles.staff
		this.executable = ["text"]
	}
    async execute (message, arg){
        if(arg.length==1)message.channel.send("Met un texte !")
        else{
            arg.shift()
            let initial = arg.join(' ').toLowerCase()
            if(initial=="itrooz"||initial=="itrooz_"){
                message.channel.send("iTrooz_ le bg")
            }else{
                let m = ''
                for(let i of initial){
                    if(Math.random()>0.5){
                        m+=i.toUpperCase()
                    }else{
                        m+=i
                    }
                }
                message.channel.send(m)
            }
        }
    }
}

module.exports.commands = { lol }

