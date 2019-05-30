const axios = require('axios')
const cheerio = require('cheerio')
const validate = require('../../common/validate')
// const logic = require('../../logic')
// const { Movie } = require('cinema-and-go-data')

// const url_cities = 'https://www.ecartelera.com/cartelera/'
const url_city = 'https://www.ecartelera.com/cines/0,9,23.html' // Bcn city cinemas
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

    async __wait(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    },


    // Internal method - Not in use | Given a url from ecartelera it returns each cities urls
    __getAllCities(html) {
        const $ = cheerio.load(html, { decodeEntities: false }) // Decode entities is needed to view correctly accents

        let citiesLinks = []

        $('.wcnt .cityselector:first-of-type a').each((i, el) => {
        const item = {city: $(el).text(), link: $(el).attr('href')}
        citiesLinks.push(item)
        })

        console.log('citiesLinks ', '\n', '-------------', citiesLinks, '\n', '-------------')
        return citiesLinks
    },

    // Internal method | Given a fetched url (html) it will returns each cinema urls
    __listCinemas(html) {
        const $ = cheerio.load(html, { decodeEntities: false }) // Decode entities is needed to view correctly accents

        let cinemaLinks = []

        $('#listings .list-std:first-of-type a:not(.inactivo)').each((i, el) => {
            const item = {cinema: $(el).text(), link: $(el).attr('href')}
            cinemaLinks.push(item)
        })

        cinemaLinks.sort((a, b) => (a.cinema > b.cinema) ? 1 : -1)

        return cinemaLinks
    },

    // Internal method | Given a fetched url (html) it will return the cinema info: name, phone, direction and projection days
    async __listCinemaInfo(html) {
        const $ = cheerio.load(html, { decodeEntities: false }) // Decode entities is needed to view correctly accents

        const cinemaName = $('h1').text()
        const telephone = $('.prices b').text()
        const direction = $('.direction').text().split('.')[0]

        const projectionDay = $('#days a').first().attr('href')

        let billboard = []

        $('.mcnt .lfilmb').each((i, el) => {
            const sessionTrim = $(el).find('.cartelerascont .showtimes').text().replace(/\r?\n|\r|\t/g, ' ').replace(/ {1,}/g, ' ').replace(/VOSE: /g,'').replace(/VOSC: /g,'').replace(/CATALÁN: /g,'').trim().split(' ')

            const movie = {
                img: 'https://www.ecartelera.com' + $(el).find('a img').attr('src'),
                title:$(el).find('h4').text().replace(/\r?\n|\r|\t/g, ' ').replace(/ {1,}/g, ' '),
                info:$(el).find('.info').text().replace(/\r?\n|\r|\t/g, ' ').replace(/ {1,}/g, ' ').trim().split(' | '),
                cast:$(el).find('.cast').text().replace(/\r?\n|\r|\t/g, ' ').replace(/ {1,}/g, ' ').replace(/Dir./gi, ', Dir.'),
                movieSessions: sessionTrim,
            }

            billboard.push(movie)
        })

        // await logic.registerMovie(name, image, info, cast)

        return {cinemaName, telephone, direction, projectionDay, billboard }
    },

    getAllCities() {
        return (async () => {
            const html = await this.__getHtml(url_cities)
            const cities = await this.__getAllCities(html)

            return cities.map(async city => {
                return await this.getAllCinemas(city.link)
            });
        })()
    },

    /**
     * getAllCinemas will get the cinemas from a single city
    */
    getAllCinemas(url_city) {
        return(async () => {
            const html = await this.__getHtml(url_city)
            const cinemas = await this.__listCinemas(html)

            let count = 0

            return Promise.all(cinemas.map(async cinema => {
                count+=1
                if(count === 10) {
                    count = 0
                    await this.__wait(2000)
                }
                const cinemaInfo = await this.getCinemaInfo(cinema.link)
                return cinemaInfo
            }))
        })()
    },

    /**
     * getCinemaInfo will returns all the information over each session in a cinema
     */
    getCinemaInfo(url_cinema) {
        return (async () => {
            const html = await this.__getHtml(url_cinema)
            const cinemaInfo = await this.__listCinemaInfo(html)
            cinemaInfo.link = url_cinema
            return cinemaInfo
        })()
    }
}

module.exports = scrapper
