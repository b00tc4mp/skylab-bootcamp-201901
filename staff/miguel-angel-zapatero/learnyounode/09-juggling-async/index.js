const http = require('http')
const bl = require('bl')

const { argv: [, , ...urls] } = process

const calls = urls.map(url => 
    new Promise((resolve, reject) => {
        http.get(url, res => {
            res.setEncoding('utf8')
            
            res.on('error', error => reject(error))
            
            let content
            res.on('data', data => {
                content = (content || '') + data
            })
            
            res.on('end', () => resolve(content))
        })
}))

Promise.all(calls).then(resps => resps.forEach(resp => console.log(resp)))