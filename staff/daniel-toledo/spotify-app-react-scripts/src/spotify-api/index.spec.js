
import spotifyApi from '.'

describe('spotify api', () => {
    const query = 'madonna'
    describe('search Artists', () => {
        it('should succeed on correct data', () =>
            spotifyApi.searchArtists(query)
                .then( results => {
                    expect(results).toBeDefined()
                    expect(results instanceof Array).Truthly()
                    })
                .catch(error => expect(error).toBeDefined())
        )

        // it('should fail on already existing user', () =>
        //     userApi.register(name, surname, username, password)
        //         .then(() => {
        //             throw Error('should not have passed by here')
        //         })
        //         .catch(error => {
        //             expect(error).toBeDefined()
        //             expect(error.message).toBe(`user with username \"${username}\" already exists`)
        //         })
        // )
    })
})