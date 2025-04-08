const http = require('http')
const URL = require('url')

const server = http.createServer((req , res) => {

    let url = req.url.split('/')

    const command = url[1]

    let numbers = url.slice(2)
    let result = 0;

    if(command === 'sum'){
        result = (+(numbers[0]) + +(numbers[1])).toString()
        res.write(result)
        res.end()
    }else{
        res.end("Command Not Found")
    }

})


server.listen(3000 , () => {
    console.log("Server is running on 3000 port")
})