const scrapper = require('./src/lib/scrapper')
const logic = require('./src/logic')

async function test() {
  // console.log('entering')
  const url = 'https://www.ecartelera.com/cines/95,0,1.html'
  const info = await scrapper.__listCinemaInfo(await scrapper.__getHtml(url))
  // const url_city = 'https://www.ecartelera.com/cines/0,9,23.html'
  // console.log(await scrapper.getAllCinemas(url_city))

  // console.log(await logic.scrapperCinemaMovies())
}

test()
