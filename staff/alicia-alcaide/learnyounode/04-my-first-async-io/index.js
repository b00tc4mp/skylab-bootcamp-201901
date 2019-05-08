const pa = process.argv[2]

const fs = require('fs')

const buf = fs.readFile(pa, 'utf8', function (error, data) {
        if (error) throw error

        const arr = data.split('\n')
        console.log(arr.length - 1)
        //console.log(str.match(/\n/g).length)
        
      }
)