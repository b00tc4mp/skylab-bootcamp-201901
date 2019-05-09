const fs = require('fs')
const filter = require('through2-filter')

const { argv: [, , file] } = process

const rs = fs.createReadStream(file)

rs
    .pipe(filter((data => {
        const results = data.toString().match(/\{CO2\}/g)
        results && console.log(`CO2 => ${results.length}`)

        return true
    })))
    .pipe(filter((data => {
        const results = data.toString().match(/\{Hg\}/g)
        results && console.log(`Hg => ${results.length}`)

        return true
    })))
    .pipe(filter((data => {
        const results = data.toString().match(/\{U\}/g)
        results && console.log(`U => ${results.length}`)

        // return true
    })))

rs.on('end', () => console.log('finish'))

console.log('continue')