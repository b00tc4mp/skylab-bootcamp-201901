const mymodule = require('./modular')
const [, , path, extension] = process.argv

const callback = function(err, data) {
  if(err) console.error(err)
  data.forEach(element => {
    console.log(element)
  });
}

mymodule(path, extension, callback)
