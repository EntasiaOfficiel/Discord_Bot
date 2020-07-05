const { secondsToTime } = require("entasia/GlobalAPI").functions

const INLINE = true

function addSanction(embed, se){
    if(se.type=="0"){
        embed.addField(":no_entry_sign: Type", "Bannissement", INLINE)
    }else if(se.type=="1"){
        embed.addField(":mute: Type", "Mute", INLINE)
    }else if(se.type=="2"){
        embed.addField(":foot: Type", "Kick", INLINE)
    }else return

    embed.addField(":lock: Staff", se.by, INLINE)
    embed.addField(":no_entry: Sanctionné", se.on, INLINE)
    if(se.when!=null){
        // TODO WHEN
    }
    if(se.type!="2"){
        embed.addField(":alarm_clock: Durée", secondsToTime(se.time), INLINE)
    }
    embed.addField(":question: Raison", se.reason, INLINE)
    return embed
}

function addSancRemoved(embed, se){
    if(se.type=="0"){
        embed.addField(":no_entry_sign: Type", "Bannissement", INLINE)
    }else if(se.type=="1"){
        embed.addField(":mute: Type", "Mute", INLINE)
    }else return

    embed.addField(":lock: Staff", se.by, INLINE)
    embed.addField(":no_entry: Sanctionné", se.on, INLINE)
    embed.addField(":alarm_clock: Durée normale", secondsToTime(se.time), INLINE)
    embed.addField(":question: Raison", se.reason, INLINE)
    embed.addField(":unlock: Staff ayant "+(se.type=="0" ? "débanni" : "démuté"), se.unbanBy, INLINE)
    embed.addField(":question: Raison de "+(se.type=="0" ? "unban" : "unmute"), se.unbanReason, INLINE)
    return embed

}

function addSancUpdate(embed, se){
    if(se.type=="0"){
        embed.addField(":no_entry_sign: Type", "Bannissement")
    }else if(se.type=="1"){
        embed.addField(":mute: Type", "Mute")
    }else return

    embed.addField(":lock: Staff initial", se.by, INLINE)
    embed.addField(":no_entry: Sanctionné", se.on, INLINE)
    embed.addField(":alarm_clock: Temps initial : ",
    (se.time == -1 ? "Indeterminé" : secondsToTime(se.time)), INLINE) // A CHANGER
    embed.addField(":question: Raison initale", se.reason, INLINE)

    embed.addField(":closed_lock_with_key: Staff ayant modifié", se.modifer, INLINE)

    if(se.newTime) embed.addField(":alarm_clock: Nouveau temps", secondsToTime(se.newTime), INLINE)
    if(se.newReason) embed.addField(":question: Nouvelle raison", se.newReason, INLINE)
    return embed

}


module.exports = { addSanction, addSancRemoved, addSancUpdate }