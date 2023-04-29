const http = require('http')
const fs = require('fs') // чтобы прога читала другой файл, подкулючаем модул fs = file system

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
} // проимистификация
const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err)
            else
                resolve(data)
        })  // (err -если все плохо будет ошибка, если ок, то data)
    })

}


const server = http.createServer(async (request, response) => {
    switch (request.url) {
        case '/home': {
            try {
                const data = await readFile('pages/about.html')
                response.write(data)
                response.end()
            } catch (err) {
                response.write('something wrong, 500')
                response.end()
            }
            break;
        }  // (err -если все плохо будет ошибка, если ок, то data)
        case '/about': {
            await delay(3000)
            response.write('About course')
            response.end()
            break;
        }
        default: {
            response.write('404 not found')
            response.end()
        }
    }
})

server.listen(3003)
