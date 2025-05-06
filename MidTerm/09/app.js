const http = require('http')

const server = http.createServer((req , res) => {
    const {method , url} = req
    const urlArray = url.split('/')
    
    if(method === "GET" && urlArray[1] == 'ch7'){
        const result = urlArray.slice(2)
        res.write(JSON.stringify(result))
        res.end()
    }else{
        res.write("Not Found")
        res.end()
    }

    
})


server.listen(2000 , () => {
    console.log("SERVER is running on port 2000")
})