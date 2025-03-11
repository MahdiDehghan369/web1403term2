let fs = require('fs')

let { start , use } = require('./03e-cmdFramework')


use("sum" , function sum(input){
    console.log(Number(input[0]) + Number(input[1]))
})

use("minus" , function minus(input){
    console.log(Number(input[0]) - Number(input[1]))
})

use("print" , function print(input){
    let person = {
        name: input[0],
        family: input[1],
        email: input[2]
    }

    for (const key in person) {
        console.log(person[key])
    }
})

use("print2" , function print(input){
    let person = {
        name: input[0],
        family: input[1],
        email: input[2]
    }

    for (const key in person) {
        console.log(`Hello ${person[key]}`)
    }
})


use("write" , function write(input){
    let person = {
        name: input[0],
        family: input[1],
        email: input[2]
    }

    fs.writeFile("data.json" , JSON.stringify(person) , (err) => {
        if(err) throw err
        console.log("Writed successfully!")
    })
})

use("create" , function create(input){
    fs.readFile("data.json" , (err , data) => {
        if(err) throw err

        let db = JSON.parse(data)

        let person = {
            name: input[0],
            family: input[1],
            email: input[2]
        }


        db.users.push(person)

        fs.writeFile("data.json" , JSON.stringify(db) , (err) => {
            if(err) throw err
            console.log("User Appended Successfully")
        })
    })
})

use("read" , function read(input){
    fs.readFile('./data.json' , (err , data) => {
        if(err){
            console.log(`error : ${err}`)
        }else{
            if(input.length === 0){
                console.log(`Data => ${data}`)
            }else{
                let obj = JSON.parse(data)
                let found = false
                for (let index = 0; index < obj.users.length; index++) {
                    if(obj.users[index].name === input[0]){
                        console.log(obj.users[index])
                        found = true
                    }
                    
                }
                if(!found){
                    console.log("Item not found")
                }
            }
        }
        
    })


})

start()