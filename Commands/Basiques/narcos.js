class narcos {
    constructor() {
    }
    execute(message, arg) {
        if(arg[1] >= 0&arg[1]<=41) var r = Math.round(arg[1])
        else var r = Math.floor(Math.random() * 41)
        message.channel.send(`https://files.entasia.fr/narcos/${r}.mp4`)
    }
}

module.exports.commands = { narcos }