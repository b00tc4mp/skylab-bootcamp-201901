const fs = require('fs')
const [, , path, extension] = process.argv

fs.readdir(path, (err, files) => {
  if (err) throw err
  const filtered = files.filter(file => file.includes(`.${extension}`))
  filtered.forEach(element => {
    console.log(element)
  });
})