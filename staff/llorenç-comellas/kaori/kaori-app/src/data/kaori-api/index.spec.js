import restApi from '.'
import { TimeoutError, ConnectionError, ValueError, RequirementError } from 'kaori-utils'

jest.setTimeout(100000)

describe('Rest Api', () => {
    const name = 'Llorenç'
    const surname = 'Comellas'
    const phone = '652119436'
    let email
    const password = '123'

    beforeEach(() => email = `llorenç-${Math.random()}@gmail.com`)

    describe('register user', () => {

        it('should succeed on correct user data', () =>
            restApi.registerUser(name, surname, phone, email, password)
                .then(response => {
                    expect(response).toBeDefined()

                    const { message, error } = response

                    expect(error).toBeUndefined()
                    expect(message).toBe('Ok, user registered.')
                })
        )
    })
})
