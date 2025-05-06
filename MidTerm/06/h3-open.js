

function open(fileName) {
    const fs = require("fs")
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
}


module.exports = open