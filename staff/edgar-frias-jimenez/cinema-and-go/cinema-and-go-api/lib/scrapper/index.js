const axios = require('axios')
const cheerio = require('cheerio')
const validate = require('../../common/validate')
const { Movie } = require('cinema-and-go-data')

const url_cinemas = 'https://www.ecartelera.com/cines/0,9,23.html' // Bcn city cinemas
// const url_cinema = 'https://www.ecartelera.com/cines/89,0,1.html' // a cinema and it's movies

const scrapper = {
  // Fetch from Axios of a given url
    __getHtml(url) {
        validate.arguments([
            { name: 'url', value: url, type: 'string', notEmpty: true },
        ])

        validate.url(url)

        return (async () => {
            const { data: html } = await axios.get(url)
            return html
        })()
    },

    // Internal method | Given a fetched url (html) it will returns each cinema urls
    __listCinemas(html) {
        // return (async () => {
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
        // })()
    },

    // Internal method | Given a fetched url (html) it will return the cinema info: name, phone, direction and projection days
    __listCinemaInfo(html) {
        const $ = cheerio.load(html, { decodeEntities: false }) // Decode entities is needed to view correctly accents

        const cinemaName = $('h1').text()
        const telephone = $('.prices b').text()
        const direction = $('.direction').text().split('.')[0]

        const projectionDay = $('#days a').first().attr('href')

        // console.log('cinema: ', cinemaName)
        // console.log('phone: ', telephone)
        // console.log('location', direction.split('.')[0])
        // console.log('projection days', projectionDay)

        return {cinemaName, telephone, direction, projectionDay }
    },

    // Internal method | Given a fetched url (html) it will returns all the info from the projected movies
    __listCinemaMovies(html) {
        const $ = cheerio.load(html, { decodeEntities: false }) // Decode entities is needed to view correctly accents

        let billboard = []

        $('.mcnt .lfilmb').each((i, el) => {
            const sessionTrim = $(el).find('.cartelerascont .showtimes').text().replace(/\r?\n|\r|\t/g, ' ').replace(/ {1,}/g, ' ').trim().split(' ')

            const movie = {
                image: 'https://www.ecartelera.com' + $(el).find('a img').attr('src'),
                title:$(el).find('h4').text().replace(/\r?\n|\r|\t/g, ' ').replace(/ {1,}/g, ' '),
                info:$(el).find('.info').text().replace(/\r?\n|\r|\t/g, ' ').replace(/ {1,}/g, ' '),
                cast:$(el).find('.cast').text().replace(/\r?\n|\r|\t/g, ' ').replace(/ {1,}/g, ' ').replace(/Dir./gi, ' Dir.'),
                movieSessions: sessionTrim,
            }

            billboard.push(movie)
        })

        // await Movie.create({ name, image, info, cast }) // Not working U__U
        // console.log(billboard)

        return billboard
    },

    /**
     * getAllCinemas will get the fetched info and then will get the cinemas from it
    */
    getAllCinemas() {
        return(async () => {
            const html = await this.__getHtml(url_cinemas)
            const cinemaIteration = await this.__listCinemas(html)
            return cinemaIteration
        })()
    },

    getCinemaInfo() {}

}


// Original code not working 100%
// const getCinemaInfo = async () => {
//   const urls = await getAllCinemas()
//   return Promise.all(urls.map(cinema => {
//     return (async () => {
//     const html = await getHtml(cinema.link)
//     const cinemaInfo = await listCinemaInfo(html)

//     console.log(cinemaInfo)
//     // console.log(await listCinemaMovies(html))
//     return cinemaInfo
//     })()
//   }))
// }


const getCinemaInfo = async () => {
  const urls = await getAllCinemas()

  // const cinemaMovies = Promise.all(await cinemaInfo.map(cinema => {
  //   return (async () => {
  //     setTimeout(async () => {
  //       const html = await getHtml(cinema.projectionDay)
  //       const movies = await listCinemaMovies(html)
  //       return movies
  //     }, 3000)
  //   })
  // }))

  // console.log(await cinemaMovies)

  // urls.map(cinemas => {
  //   return cinemas.map(async cinema => {
  //     const html = await getHtml(cinema.projectionDay)
  //     const cinemaInfo = await listCinemaInfo(html)

  //     console.log(cinemaInfo)
  //     //console.log(cinemaInfo.projectionDays)
  //     // console.log(await listCinemaMovies(html))
  //     return cinemaInfo
  //   })
  // });


  // Not workiiiiing T___T
  // async function wait(ms) {
  //   return new Promise.all(resolve => {
  //     setTimeout(resolve, ms);
  //   });
  // }

  // return (async urls => {
  //   for(let url of urls) {
  //     const html = await getHtml(url.projectionDay)
  //     await wait(3000)
  //     return html
  //   }

  //   return await listCinemaMovies(html)
  // })()
}

module.exports = scrapper
