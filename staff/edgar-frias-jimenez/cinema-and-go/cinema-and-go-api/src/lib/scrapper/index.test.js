/**
 * @jest-environment node
*/
const { FormatError, ValueError } = require('../../common/errors')
const scrapper = require('.');

describe('scrapper', () => {
    describe('Html fetch', () => {
        it('should fetch correctly data from a given url', async () => {
            const url = 'https://www.google.com/'
            const html = await scrapper.__getHtml(url)

            expect(html).toBeDefined()
            expect(typeof html).toBe('string')
        }),

        it('should fail on incorrect given url', () => {
            const url = 'haskdjhsakdhjlsakjd'
            expect(() => scrapper.__getHtml(url)).toThrowError(FormatError, `${url} is not a url`)
        })

        it('should fail on incorrect given url', () => {
            const url = ''
            expect(() => scrapper.__getHtml(url)).toThrowError(ValueError, `${url} is empty`)
        })
    })

    describe('List cinemas', () => {
        let html
        const url_cinemas = 'https://www.ecartelera.com/cines/0,9,23.html'

        beforeAll(async () => {
            html = await scrapper.__getHtml(url_cinemas)
            return html
        })

        it('should retrieve the correct info from a given html', async () => {
            const cinemaList = await scrapper.__listCinemas(html)

            expect(cinemaList).toBeDefined()
            expect(cinemaList).toBeInstanceOf(Array)
        })

        it('should fail on incorrect given html', async () => {
            html = ''

            const cinemaList = await scrapper.__listCinemas(html)
            expect(cinemaList).toHaveLength(0)
        })
    })

    describe('List cinema info', () => {
        let html
        const url_cinema = 'https://www.ecartelera.com/cines/89,0,1.html'

        beforeAll(async () => {
            html = await scrapper.__getHtml(url_cinema)
            return html
        })

        it('should get the correct info from a given html', async () => {
            const cinemaInfo = await scrapper.__listCinemaInfo(html)
            expect(cinemaInfo).toBeDefined()
            expect(cinemaInfo).toBeInstanceOf(Object)
        })

        it('should fail on incorrect info from a given html', async () => {
            html = ''

            const cinemaInfo = await scrapper.__listCinemaInfo(html)
            expect(cinemaInfo).toBeDefined()
            expect(cinemaInfo).toEqual({
                name: '',
                phone: '',
                address: '',
                location: [ 41.4071804, 2.1386014 ],
                projectionDay: undefined,
                billboard: []
            });
        })
    })

    describe('Get all cinemas', () => {
        const url_city = 'https://www.ecartelera.com/cines/0,9,23.html'
        it('should get all cinemas by calling it', async () => {
            const cinemas = await scrapper.getAllCinemas(url_city)
            expect(cinemas).toBeDefined()
            expect(cinemas).toBeInstanceOf(Array)
        })
    })

    describe('Get all information from inside a cinema', () => {
        const url_cinema = 'https://www.ecartelera.com/cines/multicines-arenas-de-barcelona/'
        it('should retrieve all cinema information when call it', async () => {
            const cinemaInfo = await scrapper.getCinemaInfo(url_cinema)
            expect(cinemaInfo).toBeDefined()
            expect(cinemaInfo).toBeInstanceOf(Object)
        })
    })
})