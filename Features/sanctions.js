const Sanctions = require("entasia/Sanctions")

socket.listen("sanc", (m)=>{
    console.log(m)
    
    let args = m.split(" ")
    let se = {}
    se.type = args[1]
    se.on = args[2]
    se.by = args[3]
    se.when = args[4]
    se.time = args[5]
    se.reason = args[6]
    if(args[0]=="0"){
        embed = Sanctions.getSanction(se)
        embed.setTitle("Nouvelle sanction :")
    }else if(args[0]=="1"){
        se.unban_by = args[7]
        se.unban_reason = args[8]
        embed = Sanctions.getSancRemoved(se)
        embed.setTitle("Sanction supprimée :")
    }else if(args[0]=="2"){
        se.modifer = args[7]
        se.newTime = args[8]
        se.newReason = args[9]
        embed = Sanctions.getSancUpdate(se)
        embed.setTitle("Sanction modifiée :")
    }
    config.channels.sanctions.send(embed)
})