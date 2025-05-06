const fs = require("fs")

let inputs = process.argv.slice(2)

fs.readFile('./database.json' , (err , data) => {
    if(err) return console.log(`Error => ${err}`)

    const db = JSON.parse(data)

    const newUser = {
        name: inputs[0],
        family: inputs[1],
        email: inputs[2]
    }

    db.records.push(newUser)


    fs.writeFile('./database.json' , JSON.stringify(db) , (err) => {
        if(err) return console.log(`Error => ${err}`)

        console.log("User Created successfully !!")
    })

})