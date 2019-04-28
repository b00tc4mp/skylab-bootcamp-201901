import movieApi from '.'


describe('movie api', () => {
    describe('search movies', () => {
        it('should succed on correct query', () =>
            movieApi.searchMovies('avengers')
                .then(movies => {
                    const { page, total_results, total_pages, results } = movies

                    expect(page).toBeDefined()
                    expect(total_results).toBeDefined()
                    expect(total_pages).toBeDefined()
                    expect(results).toBeDefined()
                    expect(results instanceof Array).toBeTruthy()
                    expect(results.length).toBe(20)
                })
        )

        it('should succed on correct query whitout results', () =>
            movieApi.searchMovies(' ')
                .then(movies => {
                    const { page, total_results, total_pages, results } = movies

                    expect(page).toBeDefined()
                    expect(total_results).toBeDefined()
                    expect(total_pages).toBeDefined()
                    expect(results instanceof Array).toBeTruthy()
                    expect(results.length).toBe(0)
                })
        )

        it('should fail if the field is empty ', () =>
            movieApi.searchMovies('')
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.errors).toBe("query must be provided")
                })
        )
    })

    describe('retrieve movie', () => {
        const id = '550'

        it('should succed on correct id', () =>
            movieApi.retrieveMovie(id)
                .then(movie => {
                    expect(movie).toBeDefined()
                    expect(movie.id).toBe('550')
                })
        )

        it('should fail on invalid id', () =>
            movieApi.retrieveMovie()
                .then(() => { throw Error('shouldnot reach this point') })
                .catch(error => {
                    expect(error.status_message).toBe('The resource you requested could not be found.')
                })
        )
    })

    describe('invalid APIKEY', () => {
        let apiKey

        beforeEach(() => {
            apiKey = movieApi.__APIKEY1__
            movieApi.__APIKEY1__ = 'failApyKey'
        })

        it('should fail on searchMovies', () =>
            movieApi.searchMovies('avenger')
                .then(() => { throw Error('shouldnot reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.status_message).toBe("Invalid API key: You must be granted a valid key.")
                })
        )

        it('should fail on retrieveMovies', () =>
            movieApi.retriveMovie(5)
                .then(() => { throw Error('shouldnot reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.status_message).toBe("Invalid API key: You must be granted a valid key.")
                })
        )

        afterEach(() => movieApi.__APIKEY1__ = apiKey)
    })
})