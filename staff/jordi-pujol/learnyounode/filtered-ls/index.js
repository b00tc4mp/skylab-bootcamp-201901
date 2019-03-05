let fs = require('fs')
let path = require('path')

fs.readdir(process.argv[2], function (err, list) {
    if (err) throw Error

    const res = (list.filter(file => path.extname(file) === `.${process.argv[3]}`))

    for (let i = 0; i < res.length; i ++) {
        console.log(res[i])
    }
})
