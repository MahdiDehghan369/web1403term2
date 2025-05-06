const fs = require("fs")

let inputs = process.argv.slice(2)

fs.readFile('./database.json' , (err , data) => {
    if(err) return console.log(`Error => ${err}`)

    const db = JSON.parse(data)
    let name = inputs[0]

    let isFound = false

    for (const user of db.records) {
        if(user.name == name){
            isFound = true
            user.family = inputs[1]
            user.email = inputs[2]
            break
        }
    }

    if(isFound){
        fs.writeFile('./database.json' , JSON.stringify(db) , (err) => {
            if(err) return console.log(`Error => ${err}`)
    
            console.log("User updated successfully !!")
        })
    }else{
        console.log("There is no user with This name")
    }



})