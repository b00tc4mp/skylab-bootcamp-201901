const {
  getAllCinemas,
  // getCinemaInfo,
  // getCinemaMovies,
  // allCities,
  // allCinemas,
  // allCinemaInfo,
  // init
} = require('./lib/scrapper')

async function test() {
  getAllCinemas()
  // getCinemaInfo(await getHtml(url_cinema))
  // getCinemaMovies(await getHtml(url_cinema))
  // console.log('\n', '--------', 'elpromiseAll',  '--------', '\n', getAllCinemas())
}

test()
