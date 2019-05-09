const md = require('./module')
const directory = process.argv[2]
const extension = process.argv[3]

md(directory, extension, (error, words) => {
  if (error) throw error
  words.forEach(element => {
    console.log(element)
  });
})


