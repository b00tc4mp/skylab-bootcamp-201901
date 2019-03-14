const { argv: [, , url] } = process
const contentUrl = require('./content-url')

contentUrl(url, (error, data)=>{
    if (error) throw error
    else console.log(data)
})
http.get(url, response => response.setEncoding("utf8").on('data', data => console.log(data)))