const lsFiltered = require('./module');
const [,, folder, ext] = process.argv;

lsFiltered(folder, ext, (error, list) => {
  if (error) throw error;
  list.forEach(item => console.log(item));
})