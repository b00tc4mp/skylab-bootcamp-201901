const http = require('http')
const bl = require('bl')

const { argv: [, , ...urls] } = process
let dataArr = []
let count = 0

for(let i = 0; i < 3; i++){
    http.get(urls[i], (response) => {
        response.pipe(bl(function (err, data) { 
            if (err!= null) console.log(err)
            dataArr[i] = data.toString()
            count++

            if (count == 3){
                for(let i = 0; i < dataArr.length; i++){
                    console.log(dataArr[i])
                }
            }
        }))
    })
}

