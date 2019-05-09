let filesFilters = require('./modulo');

const [,, pa, ext] = process.argv



const callback = function (error, data) {
    if (error) console.log(error)
    data.forEach(element => {
        console.log(element)
    })
} 


filesFilters(pa, ext, callback)


