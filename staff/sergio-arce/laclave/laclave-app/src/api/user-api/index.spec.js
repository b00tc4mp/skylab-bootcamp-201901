
import userApi from '.'

xdescribe('userApi', () => {

    describe('register user', () => {

        describe('registerUser - ERROR', () => {

            it('should throw error when name is array', () => {
                const name = []
                const username = 'arce'
                const email = 'sergio@gmail.com'
                const password = '123456'
                expect(() => userApi.registerUser(name, username, email, password).to.throw(Error, 'name is not a string'))
            })

            it('should throw error when name is empty', () => {
                const name = ''

                expect(() => userApi.registerUser(name, username, email, password).to.throw(Error, 'name is empty'))
            })

            it('should throw error when username is array', () => {

                const name = 'sergio'
                const username = []
                const email = 'sergio@gmail.com'
                const password = '123456'

                expect(() => userApi.registerUser(name, username, email, password).to.throw(Error, 'username is not a string'))
            })

            it('should throw error when username is empty', () => {
                
                const name = 'sergio'
                const username = ''
                const email = 'sergio@gmail.com'
                const password = '123456'

                expect(() => userApi.registerUser(name, username, email, password).to.throw(Error, 'username is empty'))
            })

            it('should throw error when email is array', () => {

                const name = 'sergio'
                const username = 'arce'
                const email = []
                const password = '123456'

                expect(() => userApi.registerUser(name, username, email, password).to.throw(Error, 'email is not a string'))
            })

            it('should throw error when email is empty', () => {

                const name = 'sergio'
                const username = 'arce'
                const email = ''
                const password = '123456'

                expect(() => userApi.registerUser(name, username, email, password).to.throw(Error, 'email is empty'))
            })

            it('should throw error when password is array', () => {

                const name = 'sergio'
                const username = 'arce'
                const email = 'sergio@gmail.com'
                const password = []

                expect(() => userApi.registerUser(name, username, email, password).to.throw(Error, 'password is not a string'))
            })

            it('should throw error when password is empty', () => {

                const name = 'sergio'
                const username = 'arce'
                const email = 'sergio@gmail.com'
                const password = ''

                expect(() => userApi.registerUser(name, username, email, password).to.throw(Error, 'password is empty'))
            })
        })
    })

    describe('register user', () => {

        describe('loginUser - ERROR', () => {

            it('should throw error when username is array', () => {

                const email = []

                expect(() => userApi.loginUser(email).to.throw(Error, 'email is not a string'))
            })

            it('should throw error when email is empty', () => {

                const email = ''

                expect(() => userApi.loginUser(email).to.throw(Error, 'email is empty'))
            })

            it('should throw error when password is array', () => {
                
                const email = 'sergio@gamil.com'
                const password = []

                expect(() => userApi.loginUser(email, password).to.throw(Error, 'password is not a string'))
            })

            it('should throw error when password is empty', () => {

                const email = 'sergio@gamil.com'
                const password = ''

                expect(() => userApi.loginUser(email, password).to.throw(Error, 'password is empty'))
            })
        })

    })


    describe('retrieve user', () => {

        describe('retrieveUser - ERROR', () => {

            it('should throw error when userId is array', () => {

                const userId = []

                expect(() => userApi.retrieveUser(userId, userToken).to.throw(Error, 'userId is not a string'))
            })

            it('should throw error when userId is empty', () => {

                const userId = ''

                expect(() => userApi.retrieveUser(userId, userToken).to.throw(Error, 'userId is empty'))
            })

            it('should throw error when userToken is array', () => {

                const userId = '1234566'
                const userToken = []

                expect(() => userApi.retrieveUser(userId, userToken).to.throw(Error, 'userToken is not a string'))
            })

            it('should throw error when userToken is empty', () => {

                const userId = '1234566'
                const userToken = ''

                expect(() => userApi.retrieveUser(userId, userToken).to.throw(Error, 'userToken is empty'))
            })
        })

    })

    describe('update user', () => {

        describe('updateUser - ERROR', () => {

            it('should throw error when userId is array', () => {

                const userId = []

                expect(() => userApi.updateUser(userId, userToken).to.throw(Error, 'userId is not a string'))
            })

            it('should throw error when userId is empty', () => {

                const userId = ''

                expect(() => userApi.updateUser(userId, userToken).to.throw(Error, 'userId is empty'))
            })

            it('should throw error when userToken is array', () => {

                const userId = "123456"
                const userToken = []

                expect(() => userApi.updateUser(userId, userToken).to.throw(Error, 'userToken is not a string'))
            })

            it('should throw error when userToken is empty', () => {

                const userId = "123456"
                const userToken = ''

                expect(() => userApi.updateUser(userId, userToken).to.throw(Error, 'userToken is empty'))
            })

            it('should throw error when the userData is an array', () => {
                const userId = '123456'
                const userData = []

                expect(() => logic.updateUser(userId, userData).to.throw(Error, 'userData is not an object'))

            })
        })
    })

    describe('searchCongresses', () => {

        it('should throw error when query is array', () => {

            const query = []

            expect(() => logic.searchCongresses(query)).to.throw(Error, 'query is not a string')

        })

        it('should throw error when query is empty', () => {

            const query = ''

            expect(() => logic.searchCongresses(query)).to.throw(Error, 'query is empty')

        })

    })

    describe('searchArtist', () => {

        it('should throw error when query is array', () => {

            const query = []

            expect(() => logic.searchArtist(query)).to.throw(Error, 'query is not a string')

        })

        it('should throw error when query is empty', () => {

            const query = ''

            expect(() => logic.searchArtist(query)).to.throw(Error, 'query is empty')

        })

    })

    describe('searchItems', () => {

        it('should throw error when query is array', () => {

            const query = []

            expect(() => logic.searchItems(query)).to.throw(Error, 'query is not a string')

        })

        it('should throw error when query is empty', () => {

            const query = ''

            expect(() => logic.searchItems(query)).to.throw(Error, 'query is empty')

        })

    
    })

    describe('createArtist', () => {

        it('should throw error when artistData is array', () => {

            const artistData = []

            expect(() => logic.createArtist(query)).to.throw(Error, 'artistData is not an Object')

        })

        it('should throw error when token is array', () => {

            const token = []

            expect(() => logic.createArtist({}, token)).to.throw(Error, 'token is not a string')

        })

        it('should throw error when token is empty', () => {

            const token = ''

            expect(() => logic.createArtist({}, token)).to.throw(Error, 'token is empty')

        })

    })

    describe('createCongress', () => {

        it('should throw error when data is array', () => {

            const data = []

            expect(() => logic.createCongress(data)).to.throw(Error, 'data is not an Object')

        })


        it('should throw error when token is array', () => {

            const token = []

            expect(() => logic.createCongress({}, token)).to.throw(Error, 'token is not a string')

        })

        it('should throw error when token is empty', () => {

            const token = ''

            expect(() => logic.createCongress({}, token)).to.throw(Error, 'token is empty')

        })

    })






})