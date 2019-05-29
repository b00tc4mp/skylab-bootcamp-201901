const scrapper = require('./lib/scrapper')

async function test() {
  console.log(await scrapper.getAllCinemas())
}

test()
