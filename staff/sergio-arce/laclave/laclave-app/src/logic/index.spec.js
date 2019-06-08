import logic from '.'

describe('logic', () => {

    describe('register user', () => {

        describe('registerUser - ERROR', () => {

            it('should throw error when name is array', () => {
                const name = []
                const username = 'arce'
                const email = 'sergio@gmail.com'
                const password = '123456'
                expect(() => logic.registerUser(name, username, email, emailConfirm, password).to.throw(Error, 'name is not a string'))
            })

            it('should throw error when name is empty', () => {
                const name = ''

                expect(() => logic.registerUser(name, username, email, emailConfirm, password).to.throw(Error, 'name is empty'))
            })

            it('should throw error when username is array', () => {

                const username = []

                expect(() => logic.registerUser(name, username, email, emailConfirm, password).to.throw(Error, 'username is not a string'))
            })

            it('should throw error when username is empty', () => {
                const username = ''

                expect(() => logic.registerUser(name, username, email, emailConfirm, password).to.throw(Error, 'username is empty'))
            })

            it('should throw error when email is array', () => {

                const email = []

                expect(() => logic.registerUser(name, username, email, emailConfirm, password).to.throw(Error, 'email is not a string'))
            })

            it('should throw error when email is empty', () => {

                const email = ''

                expect(() => logic.registerUser(name, username, email, emailConfirm, password).to.throw(Error, 'email is empty'))
            })

            it('should throw error when emailConfirm is array', () => {

                const emailConfirm = []

                expect(() => logic.registerUser(name, username, email, emailConfirm, password).to.throw(Error, 'emailConfirm is not a string'))
            })

            it('should throw error when emailConfirm is empty', () => {

                const emailConfirm = ''

                expect(() => logic.registerUser(name, username, email, emailConfirm, password).to.throw(Error, 'emailConfirm is empty'))
            })

            it('should throw error when password is array', () => {

                const password = []

                expect(() => logic.registerUser(name, username, email, emailConfirm, password).to.throw(Error, 'password is not a string'))
            })

            it('should throw error when password is empty', () => {

                const password = ''

                expect(() => logic.registerUser(name, username, email, emailConfirm, password).to.throw(Error, 'password is empty'))
            })
        })
    })

    describe('login user', () => {

        describe('loginUser - ERROR', () => {

            it('should throw error when username is array', () => {

                const username = []

                expect(() => logic.loginUser(username, password).to.throw(Error, 'username is not a string'))
            })

            it('should throw error when username is empty', () => {

                const username = ''

                expect(() => logic.loginUser(username, password).to.throw(Error, 'username is empty'))
            })

            it('should throw error when password is array', () => {

                const password = []

                expect(() => logic.loginUser(username, password).to.throw(Error, 'password is not a string'))
            })

            it('should throw error when password is empty', () => {

                const password = ''

                expect(() => logic.loginUser(username, password).to.throw(Error, 'password is empty'))
            })
        })

    })

})