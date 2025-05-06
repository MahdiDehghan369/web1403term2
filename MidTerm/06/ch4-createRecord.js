


function createRecord(inputs) {
    const fs = require("fs")
    fs.readFile('./database.json', (err, data) => {
        if (err) return console.log(`Error => ${err}`)

        const db = JSON.parse(data)

        const newUser = {
            name: inputs[1],
            family: inputs[2],
            email: inputs[3]
        }

        db.records.push(newUser)


        fs.writeFile('./database.json', JSON.stringify(db), (err) => {
            if (err) return console.log(`Error => ${err}`)

            console.log("User Created successfully !!")
        })

    })
}


module.exports = createRecord