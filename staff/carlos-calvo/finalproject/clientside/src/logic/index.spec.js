import logic from '.'
const ;




describe('logic', () => {
    describe('register user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on valid data', () =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(result => expect(result).toBeUndefined())
                .catch(err => expect(err).toBeUndefined())
        )

        it('should fail on non-string name', () => {
            const name = undefined
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })
    })
})