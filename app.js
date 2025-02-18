const {argv} = require('process');

let sumNumber = 0;

for(let index = 2 ; index < argv.length; index++){
    sumNumber += +argv[index]
}

console.log(`Sum: ${sumNumber}`);