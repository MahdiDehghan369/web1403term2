let fs = require('fs')

let input = process.argv.slice(3)

let command = process.argv[2].toLowerCase()


let controllers = [
    {
        command : "sum",
        function: function sum(input){
            console.log(Number(input[0]) + Number(input[1]))
        }
    },

    {
        command : "minus",
        function: function minus(input){
            console.log(Number(input[0]) - Number(input[1]))
        }
    },

    
    {
        command : "print",
        function: function print(input){
            let person = {
                name: input[0],
                family: input[1],
                email: input[2]
            }
        
            for (const key in person) {
                console.log(`Hello ${person[key]}`)
            }
        }
    },

    
    {
        command : "write",
        function: function write(input){
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
    },

    
    {
        command : "create",
        function: function create(input){
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
        }
    },

    
    {
        command : "read",
        function: function read(input){
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
        
        
        }
    }
]



for (const controller of controllers) {
    if(controller.command == command){
        controller.function(input)
    }
}