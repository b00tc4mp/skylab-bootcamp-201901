
const filter = require('./filter')

const {argv: [,,folder, extension]} = process

filter(folder, extension, (error,files) => {
    if(error) throw error

    files.forEach(file => console.log(file))     
})