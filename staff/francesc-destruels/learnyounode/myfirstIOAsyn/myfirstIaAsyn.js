const fs = require('fs') //Traemos el modulo y hacemos un hijo
const file = process.argv[2] //Extraemos el path al archivo

fs.readFile(file, (err, lines) => { //Al ser asyncrono necesitamos una callbacl
    if (err) throw Error('Something wrong happend') //que de error si gfalla

    const results = lines.toString().split('\n').length - 1 // repetimos lo de pasarlo a string y blah
    console.log(results) // imprimimos
})
