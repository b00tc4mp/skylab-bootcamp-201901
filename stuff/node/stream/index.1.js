// $ node . a.txt b.txt

const fs = require('fs')

const { argv: [, , from, to] } = process

console.log(process.memoryUsage())

fs.readFile(from, (err, content) => {
    if (err) throw err

    console.log(process.memoryUsage())

    fs.writeFile(to, content, err => {
        if (err) throw err

        console.log(process.memoryUsage())
    })
})