const {argv} = process

const mymodule=require('./mymodule.js')

mymodule(argv[2], argv[3], (error, filteredList)=> {
    if (!error) filteredList.forEach(wantedFile=>console.log(wantedFile))
    else console.error(error)
})