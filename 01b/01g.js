let fs = require('fs')

let input = process.argv.slice(3)

let command = process.argv[2].toLowerCase()

if (command === "sum") {
    for (let index = 0; index < input.length; index++) {

    }
    console.log(Number(input[0]) + Number(input[1]))

} else if (command === "minus") {
    console.log(Number(input[0]) - Number(input[1]))
} else if (command === "print") {
    let person = {
        name: input[0],
        family: input[1],
        email: input[2]
    }

    for (const key in person) {
        console.log(`Hello ${person[key]}`)
    }
}else if (command === "write") {
    let person = {
        name: input[0],
        family: input[1],
        email: input[2]
    }

    fs.writeFile("data.json" , JSON.stringify(person) , (err) => {
        if(err) throw err
        console.log("Writed successfully!")
    })
}
else {
    console.log("command not found")
}