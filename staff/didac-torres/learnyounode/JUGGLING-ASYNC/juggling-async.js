// const [, , ...url] = process.argv
// var http = require('http');
// var bl = require('bl');

// let long = url.length
// var results = []
// var count = 0

// //OPTION "1"
// url.forEach(url =>

//     http.get(url, function (response) {
//         response.pipe(bl(function (err, data) {
//             if (err) return console.log(err)
//             data = data.toString()
//             return console.log(data)

//         }))
//     })

// )

var http = require('http')
var bl = require('bl')
var results = []
var count = 0

function printResults () {
  for (var i = 0; i < 3; i++) {
    console.log(results[i])
  }
}

function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
    response.pipe(bl(function (err, data) {
      if (err) {
        return console.error(err)
      }

      results[index] = data.toString()
      count++

      if (count === 3) {
        printResults()
      }
    }))
  })
}

for (var i = 0; i < 3; i++) {
  httpGet(i)
}