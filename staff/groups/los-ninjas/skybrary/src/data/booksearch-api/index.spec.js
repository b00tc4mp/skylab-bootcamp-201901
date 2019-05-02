import searchBooksApi from '.'

describe('search books isbn ', () => {
    describe('search books', () => {
        it('should succeed on correct query', () =>
        searchBooksApi.searchBooks('Lord of the Rings')
                .then(books => {
                    expect(books).toBeDefined()
                    expect(books instanceof Object).toBeTruthy()
                })
        )
    })

    // TODO other cases
})