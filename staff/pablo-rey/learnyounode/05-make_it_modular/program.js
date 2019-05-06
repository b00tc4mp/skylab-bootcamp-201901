const lsFiltered = require('./module');
const [,, folder, ext] = process.argv;

lsFiltered(folder, ext, (error, list) => {
  list.forEach(item => console.log(item));
})