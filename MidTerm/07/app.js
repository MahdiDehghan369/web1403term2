const { start, use } = require('./frameWork')
const fs = require("fs")


use("createFile", function createFile(input) {
    const fileName = input[0]
    const body = input[1]
    const isFileExist = fs.existsSync(fileName)
    if (!isFileExist) {
        fs.writeFile(`./${fileName}`, body, (err) => {
            if (err) {
                return console.log(`Error => ${err}`)
            }

            console.log("File Created Successfully !!")
            console.log(`File Name is => ${fileName}`)
        })
    } else {
        fs.appendFile(`./${fileName}`, body + '\n', (err) => {
            if (err) {
                return console.log(`Error => ${err}`)
            }

            console.log("File Already Exist !!")
            console.log("Date added successfully !!")
        })
    }
})


use("open", function open(input) {
    const fileName = input[0]
    const isFileExist = fs.existsSync(fileName)

    if (isFileExist) {
        const stats = fs.statSync(fileName)

        if (stats.isFile(fileName)) {
            console.log("file")

            fs.readFile(`./${fileName}`, (err, data) => {
                if (err) return console.log(`Error => ${err}`)

                const dataFile = data.toString()

                console.log(`Data => ${dataFile}`)
            })

        } else if (stats.isDirectory(fileName)) {
            const contentsFolder = fs.readdirSync(`./${fileName}`)
            for (const content of contentsFolder) {
                console.log(content)
            }
        } else {
            console.log("No File Or No Dir")
        }
    } else {
        console.log("No have Folder Or File with this name")
    }
})


use("createRecord", function createRecord(input) {
    const fs = require("fs")
    fs.readFile('./database.json', (err, data) => {
        if (err) return console.log(`Error => ${err}`)

        const db = JSON.parse(data)

        const newUser = {
            name: input[1],
            family: input[2],
            email: input[3]
        }

        db.records.push(newUser)


        fs.writeFile('./database.json', JSON.stringify(db), (err) => {
            if (err) return console.log(`Error => ${err}`)

            console.log("User Created successfully !!")
        })

    })
})




start()