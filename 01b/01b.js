console.log(`Enter Numbers: ${process.argv}`)

let sum = 0

let numbers = process.argv.slice(2)

for (let index = 0; index < numbers.length; index++) {
    sum += +numbers[index]
    
}


console.log(`Sum: ${sum}`)