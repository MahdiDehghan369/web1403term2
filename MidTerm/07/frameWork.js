let fs = require('fs')
let input = process.argv.slice(3)
let command = process.argv[2]


let controllers = []


function use(command , func){
    let item = {
        command : command,
        function: func
    }

    controllers.push(item)
}


function start(){
    for (const controller of controllers) {
        if(controller.command == command){
            controller.function(input)
        }
    }
}



module.exports = {
    start ,
    use
}