
let lastupdate
let updating
const time = 3000

socket.listen("players", (m)=>{
    vars.totalonlines = m.split(" ")
    if(vars.totalonlines[0]==""){
        vars.totalonlines = []
    }
    
    if(Date.now()-lastupdate<time){ // but : éviter les actualisations trop rapides
        if(!updating){
            updating = true
            setTimeout(()=>{
                updating = false
                update()
            }, time)
        }
    }else{
        update()
    }

})

function update(){
    lastupdate = Date.now()
    let s = vars.totalonlines.length == 1 ? "" : "s"
    bot.user.setPresence({ activity: { name: vars.totalonlines.length+" connecté"+s , type: "WATCHING" }})
}

update()


socket.listen("onlines", (m)=>{
    let a = m.split(" ")
	vars.onlines[a[0]] = a[1]
})