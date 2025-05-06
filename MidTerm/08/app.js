const http = require('http')

const server = http.createServer((req , res) => {
    console.log(req.url)
    res.end()
})


server.listen(2000 , () => {
    console.log("SERVER is running on port 2000")
})