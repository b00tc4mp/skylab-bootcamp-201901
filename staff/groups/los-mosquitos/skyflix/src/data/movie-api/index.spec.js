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
            movieApi.searchMovies('asdfasdfasdf')
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
                .then((response) => { 
                    expect(response).toBeDefined()
                    expect(response.errors[0]).toBe('query must be provided')
                })
        )
    })

    describe('retrieve movie', () => {
        const id = 550

        it('should succed on correct id', () =>
            movieApi.retrieveMovie(id)
                .then(movie => {
                    expect(movie).toBeDefined()
                    expect(movie.id).toBe(id)
                })
        )

        it('should fail on invalid id', () =>
            movieApi.retrieveMovie(6868768)
                .then(response => {
                    expect(response).toBeDefined()
                    expect(response.status_message).toBe('The resource you requested could not be found.')
                })
        )
    })

    describe('retrieve movie genres', () => {
        it('should succed with correct apikey', () =>
            movieApi.retrieveMovieGenres()
                .then(response => {
                    expect(response).toBeDefined()
                    expect(response instanceof Object).toBeTruthy()
                    expect(response.genres instanceof Array).toBeTruthy()
                    expect(response.genres.length).toBe(19)
                })
        )
    })

    describe('retrieve Trailer', () => {

        it('should succed on ')
            const id = 550
            movieApi.retrieveTrailer()

        })


    describe('invalid APIKEY', () => {
        let apiKey

        beforeEach(() => {
            apiKey = movieApi.__APIKEY1__
            movieApi.__APIKEY1__ = 'failApyKey'
        })

        it('should fail on searchMovies', () =>
            movieApi.searchMovies('avenger')
                .then(response => {
                    expect(response).toBeDefined()
                    expect(response.status_message).toBe('Invalid API key: You must be granted a valid key.')
                })
        )

        it('should fail on retrieveMovies', () =>
            movieApi.retrieveMovie(5)
                .then(response => {
                    expect(response).toBeDefined()
                    expect(response.status_message).toBe('Invalid API key: You must be granted a valid key.')
                })
        )

        it('should fail on retrieveMovieGenres', () =>
            movieApi.retrieveMovieGenres()
                .then(response => {
                    expect(response).toBeDefined()
                    expect(response.status_message).toBe('Invalid API key: You must be granted a valid key.')
                })
        )

        afterEach(() => movieApi.__APIKEY1__ = apiKey)
    })
})