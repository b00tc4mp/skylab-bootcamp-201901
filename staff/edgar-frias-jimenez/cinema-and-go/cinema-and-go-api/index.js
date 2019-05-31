const scrapper = require('./lib/scrapper')
const logic = require('./logic')

async function test() {
  // console.log('entering')
  const url = 'https://www.ecartelera.com/cines/multicines-arenas-de-barcelona/'
  const info = await scrapper.__listCinemaInfo(await scrapper.__getHtml(url))
  // console.log('info', info)
  // const url_city = 'https://www.ecartelera.com/cines/0,9,23.html'
  // console.log(await scrapper.getAllCinemas(url_city))

  // console.log(await logic.scrapperCinemaMovies())
}

test()
