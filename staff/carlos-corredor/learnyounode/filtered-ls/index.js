const fs = require('fs')
let extention = process.argv[3]
fs.readdir(process.argv[2], (err, files) => {
    let filtered = files.filter(word => word.lastIndexOf('.') !== -1)
    let acc = 0
    let newArr = filtered.map(function(x) {
        let selected =''
        if(x.lastIndexOf('.') && x.lastIndexOf('.') !== x.length -1){
            for (let i = x.lastIndexOf('.') + 1 ; i < x.length; i++) {
                selected += x[i]
            }
        }
        
        return [selected, acc++]
     })
    //  newArr = newArr.filter(word => word.length > 0)
    // console.log(newArr)
    let file = newArr.filter(x => x[0].length)
    // console.log(file)
    file.forEach(element => {
        if(element[0] === extention) console.log(filtered[element[1]])
    });
})



// if(word.length > 3){
//     let newName =''
//     for (let i = word.length; i > word.length - 3; i--){
//         newName += word[i]
//     }
//     newArr.push(newName)
// }