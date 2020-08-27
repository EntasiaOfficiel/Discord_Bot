async function test(a){
    return new Promise(async (resolve, reject)=>{
        if(a==1)resolve("result")
        else reject("nop")
    })
}

(async ()=>{ // code async en main

    let result = await test(2)
    .catch(()=>{
        return "wtf ?"
    })
    console.log(result)

})()