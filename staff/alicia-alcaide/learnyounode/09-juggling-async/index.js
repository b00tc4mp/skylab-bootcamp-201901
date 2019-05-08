const http = require('http')
const bl = require('bl')
let results = []
let count = 0
 

function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
    response.pipe(bl(function (err, data) {
      if (err) throw console.error(err)
 
      results[index] = data.toString()
      count++
 
      if (count === 3) results.forEach(res => console.log(res))
    }))
  })
}
 
for (var i = 0; i < 3; i++)
  httpGet(i)


