const input = process.argv.slice(2)
const fileName = input[1]
const body = input[2]
const command = input[0]

const createFile = require('./ch2-createFile')
const open = require('./h3-open')
const createRecord = require('./ch4-createRecord')

if (command === "createFile") {
    createFile(fileName, body)
} else if (command === "open") {
    open(fileName)
} else if (command === "createRecord") {
    createRecord(input)
} else {
    console.log("Command Not Found")
}

