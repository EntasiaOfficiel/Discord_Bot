class choix {
    constructor() {
        this.alias = ["choice"]
    }
    execute(message, arg) {
        arg.shift()
        let c = arg.join(' ').split(" ou ")
        if(c[c.length - 1].endsWith("?")){let l = c.length - 1;c[l] = c[l].substring(0, c[l].length - 2)}
        if(c.length < 2){
            message.channel.send("Syntaxe : `.choix <proposition A> ou <proposition B>`")
            return
        }
        message.channel.send("J'ai choisi : "+c[Math.floor(Math.random() * c.length)])
    }
}

module.exports.commands = { choix }