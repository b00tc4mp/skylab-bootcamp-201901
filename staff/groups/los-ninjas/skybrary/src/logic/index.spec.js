import logic from '.'

describe('logic', () => {
    describe('books api', () => {
        it('should succeed searching books', () => {
            logic.searchBooks('Lord of the rings')
                .then(books => {
                    expect(books).toBeDefined()
                    expect(books instanceof Object).toBeTruthy()
            })
        })
        it('should fail on empty query', () => {
            const query = ' \t    \n'
            logic.searchBooks(query)
                .then(response =>{
                    expect(response).toBeDefined()
                    const { status } = response
                    expect(status).toBe('500')
                })
        })   

        it('should fail if not find results', () => {
            const query = '2362836283'
            logic.searchBooks(query)
                .then(response =>{
                    expect(response).toBeDefined()
                    const {docs} = response
                    expect(docs.length).toBe(0)
                })
        })
    })
})






















// describe('ducks', () => {
//     describe('search ducks', () => {
//         it('should succeed on correct query', () =>
//             logic.searchDucks('yellow')
//                 .then(ducks => {
//                     expect(ducks).toBeDefined()
//                     expect(ducks instanceof Array).toBeTruthy()
//                     expect(ducks.length).toBe(13)
//                 })

//             // TODO other cases
//         )
//     })



// searchBooks(query) {
//     validate.arguments([
//         { name: 'query', value: query, type: 'string' }
//     ])

//     return searchBooksApi.searchBooks(query)
// },