let input = process.argv.slice(3)

let command = process.argv[2].toLowerCase()

if(command === "sum"){
    for (let index = 0; index < input.length; index++) {
        
    }
    console.log(Number(input[0]) + Number(input[1]))

}else if(command === "minus"){
    console.log(Number(input[0]) - Number(input[1]))
}
else{
    console.log("command not found")
}