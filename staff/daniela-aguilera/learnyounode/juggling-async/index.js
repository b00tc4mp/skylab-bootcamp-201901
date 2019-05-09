const http = require('http')

const { argv: [, , ...urls] } = process

var bl = require('bl')


urls.forEach(function(url){

    http.get(url, res => {

        res.setEncoding('utf8')

        res.on('error', error => { throw error })
    
        let content = ''

        res.on('data', data => content += data)

        res.on('end', () => console.log(`${content}`))
    })

})




