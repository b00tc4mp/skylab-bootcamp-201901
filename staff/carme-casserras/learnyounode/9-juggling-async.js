const http = require('http')
const bl = require('bl')

const {argv: [,, ...url]} = process


let resp = [];
let count = (process.argv.length)-2

for (let i = 2; i <= 4; i++){   
    
    http.get(process.argv[i], response => {            
            
            response.pipe(bl((error, data) => {
                if (error) throw error   
                else resp[i] = data.toString()
                count--
                
                if (count == 0) {
                    resp.forEach(results => {
                        console.log(results)
                    })
                }       
        }))
    })
}
