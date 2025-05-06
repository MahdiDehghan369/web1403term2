
function createFile (fileName , body) {
    const fs = require("fs")
    const isFileExist = fs.existsSync(fileName)


    if(!isFileExist){
        fs.writeFile(`./${fileName}` , body , (err) => {
            if(err){
                return console.log(`Error => ${err}`)
            }
        
            console.log("File Created Successfully !!")
            console.log(`File Name is => ${fileName}`)
        })
    }else{
        fs.appendFile(`./${fileName}` , body + '\n' , (err) => {
            if(err){
                return console.log(`Error => ${err}`)
            }
        
            console.log("File Already Exist !!")
            console.log("Date added successfully !!")
        })
    }
}

module.exports = createFile
