const http = require('http')
const URL = require('url')

const server = http.createServer((req, res) => {
    let data = ''
    req.on("data", (chunk) => {
        data += chunk.toString()
    })

    req.on('end', () => {
        router(req, res, data)
    })
})


let router = (req, res, data) => {
    let url = req.url.split('/')

    const command = url[1]

    let numbers = url.slice(2)
    let result = 0;
    let { method } = req

    console.log(method)

    if (method == 'GET' && command === 'sum') {
        result = (+(numbers[0]) + +(numbers[1])).toString()
        res.write(result)
        res.end()
    } else if (command === 'log') {
        res.write(data)
        console.log(JSON.parse(data).name)
        res.end()
    } else if (method == 'POST' && command === 'sum') {
        let numbers = JSON.parse(data)
        let result = numbers.num1 + numbers.num2
        res.write(JSON.stringify(result))
        res.end()
    } else {
        res.end("Command Not Found")
    }
}

server.listen(3000, () => {
    console.log("Server is running on 3000 port")
})