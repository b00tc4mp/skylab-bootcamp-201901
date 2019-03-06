const fs = require('fs')

const { argv: [, , from, to] } = process

module.exports = fs.copyFile(from, to, err => {
    if (err) console.error(err)
    else fs.unlink(from, err => {
        if (err) console.error(err)
    })
})


// fs.writeFile(to, 'file.txt', err=> {
//     if (err) console.error(err)
// })



// fs.rename(from, to, err => {
//     if (err) console.error(err)
//     else console.log(`Renamed ${from} to ${to}`)
// })