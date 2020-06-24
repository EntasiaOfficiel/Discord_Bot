const Sanctions = require("entasia/Sanctions")

function b64(a){
    return Buffer.from(a, 'base64')
}

socket.listen("sanc", (m)=>{
    
    let args = m.split(" ")
    let se = {}
    se.type = args[1]
    se.on = args[2]
    se.by = args[3]
    se.when = args[4]
    se.time = args[5]
    se.reason = b64(args[6])

    let embed = new CustomEmbed()
    embed.setTimestamp()

    if(args[0]=="0"){
        Sanctions.addSanction(embed, se)
        embed.setTitle("Nouvelle sanction :")
    }else if(args[0]=="1"){
        se.unbanBy = args[7]
        se.unbanBeason = b64(args[8])
        Sanctions.addSancRemoved(embed, se)
        embed.setTitle("Sanction supprimée :")
    }else if(args[0]=="2"){
        se.modifer = args[7]
        se.newTime = args[8]
        se.newReason = b64(args[9])
        Sanctions.addSancUpdate(embed, se)
        embed.setTitle("Sanction modifiée :")
    }
    config.channels.sanctions.send(embed)
})