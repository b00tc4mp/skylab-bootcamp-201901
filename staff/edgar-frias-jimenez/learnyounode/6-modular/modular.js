module.exports = function(path, extension, callback) {
  const fs = require('fs')
  let results = []

  fs.readdir(path, (err, files) => {
    if (err) return callback(err)
    const filtered = files.filter(file => file.includes(`.${extension}`))
    filtered.forEach(element => {
      results.push(element)
    })

    callback(null, results)
  })
}
