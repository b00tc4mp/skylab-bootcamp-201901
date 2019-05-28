
const axios = require('axios')
const cheerio = require('cheerio')

// const url_cities = 'https://www.ecartelera.com/cartelera/' // all cities
const url_cinemas = 'https://www.ecartelera.com/cines/0,9,23.html' // Bcn city cinemas
// const url_cinema = 'https://www.ecartelera.com/cines/89,0,1.html' // a cinema and it's movies

// Fetch from Axios of a given url
const getHtml = async url => {
  const { data: html } = await axios.get(url)
  return html
}

// Deprecated Code | Not importing cities now
// Given a fetched url (html) it will returns each city urls
// const listCities = async html => {
//   const $ = cheerio.load(html, { decodeEntities: false }) // Decode entities is needed to view correctly accents

//   let citiesLinks = []

//   $('.wcnt .cityselector:first-of-type a').each((i, el) => {
//     const item = {city: $(el).text(), link: $(el).attr('href'), cines: []}
//     citiesLinks.push(item)
//   })

//   citiesLinks.sort((a, b) => (a.city > b.city) ? 1 : -1)

//   // console.log('\n', '--------', 'listCities', '--------', citiesLinks)
//   return citiesLinks
// }

// Given a fetched url (html) it will returns each cinema urls
const listCinemas = async html => {
  const $ = cheerio.load(html, { decodeEntities: false }) // Decode entities is needed to view correctly accents

  let cinemaLinks = []

  $('#listings .list-std:first-of-type a:not(.inactivo)').each((i, el) => {
    // TODO: With this new Object getAllCinemas don't work properly, it gives [Object] as a result and not the expected result, REVISE IT!
    const item = {cinema: $(el).text(), link: $(el).attr('href')}
    // const item = $(el).attr('href')
    cinemaLinks.push(item)
  })

  cinemaLinks.sort((a, b) => (a.cinema > b.cinema) ? 1 : -1)

  // console.log('\n', '--------', 'listCinemas', '--------', '\n', cinemaLinks)
  return cinemaLinks
}

// Given a fetched url (html) it will return the cinema info: name, phone, direction and projection days
const listCinemaInfo = async html => {
  const $ = cheerio.load(html, { decodeEntities: false }) // Decode entities is needed to view correctly accents

  const cinemaName = $('h1').text()
  const telephone = $('.prices b').text()
  const direction = $('.direction').text().split('.')[0]

  let projectionDays = []

  $('#days a').each((i, el) => {
    const item = $(el).attr('href')
    projectionDays.push(item)
  })

  // console.log('cinema: ', cinemaName)
  // console.log('phone: ', telephone)
  // console.log('location', direction.split('.')[0])
  // console.log('projection days', projectionDays)

  return {cinemaName, telephone, direction, projectionDays}
}

// Given a fetched url (html) it will returns all the info from the projected movies
const listCinemaMovies = async html => {
  const $ = cheerio.load(html, { decodeEntities: false }) // Decode entities is needed to view correctly accents

  let billboard = []

  $('.mcnt .lfilmb').each((i, el) => {
    const sessionTrim = $(el).find('.cartelerascont .showtimes').text().replace(/\r?\n|\r|\t/g, ' ').replace(/ {1,}/g, ' ').trim().split(' ')

    const movie = {
      image: 'https://www.ecartelera.com' + $(el).find('a img').attr('src'),
      title:$(el).find('h4').text().replace(/\r?\n|\r|\t/g, ' ').replace(/ {1,}/g, ' '),
      info:$(el).find('.info').text().replace(/\r?\n|\r|\t/g, ' ').replace(/ {1,}/g, ' '),
      cast:$(el).find('.cast').text().replace(/\r?\n|\r|\t/g, ' ').replace(/ {1,}/g, ' ').replace(/Dir./gi, ' Dir.'),
      sessions: sessionTrim,
    }
    billboard.push(movie)
  })

  // console.log(billboard)

  return billboard
}

/**
 * getAllCities will get the fetched info (through getHtml()) from a url and then will get the cities from it (through listCities())
 */
// Deprecated Code | Not importing cities now
// const getAllCities = async () => {
//   const url = 'https://www.ecartelera.com/cartelera/' // all cities
//   const html = await getHtml(url)
//   const cities = await listCities(html)

//   // console.log('\n', '--------', 'getAllCities', '--------', '\n', cities)
//   return cities
// }

/**
 * getAllCinemas will get the fetched info (through getHtml()) from a url and then will get the cinemas from it (through listCinemas())
 */
const getAllCinemas = async () => {
  // Deprecated Code | Not importing cities now
  // const urls = await getAllCities()
  // const cinemaIteration = await Promise.all(urls.map(async(e) => {
  //   const html = await getHtml(e.link)
  //   return await listCinemas(html)
  // }))

  const html = await getHtml(url_cinemas)
  const cinemaIteration = await listCinemas(html)

  console.log(cinemaIteration)

  return cinemaIteration
}

const getCinemaInfo = async () => {
  const urls = await getAllCinemas()

  urls.map(cinemas => {
    return cinemas.map(async cinema => {
      const html = await getHtml(cinema)
      const cinemaInfo = await listCinemaInfo(html)

      console.log(cinemaInfo)
      //console.log(cinemaInfo.projectionDays)
      // console.log(await listCinemaMovies(html))
      return cinemaInfo
    })
  });
}

module.exports = {
  getHtml,
  listCities,
  listCinemas,
  listCinemaInfo,
  listCinemaMovies,
  getAllCities,
  getAllCinemas,
  getCinemaInfo
}
