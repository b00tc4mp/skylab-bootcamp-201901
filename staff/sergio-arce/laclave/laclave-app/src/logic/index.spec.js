import logic from '.'

describe('logic', () => {

    describe('register user', () => {

        describe('registerUser - ERROR', () => {

            it('should throw error when name is array', () => {
                const name = []
                const username = 'arce'
                const email = 'sergio@gmail.com'
                const password = '123456'
                expect(() => logic.registerUser(name, username, email, password)).toThrowError(new TypeError('name is not a string'))
            })

            it('should throw error when name is empty', () => {
                const name = ''
                const username = 'arce'
                const email = 'sergio@gmail.com'
                const password = '123456'
                expect(() => logic.registerUser(name, username, email, password)).toThrowError(new Error('name is empty'))
            })

            it('should throw error when username is array', () => {
                const name = 'sergio'
                const username = []
                const email = 'sergio@gmail.com'
                const password = '123456'
                expect(() => logic.registerUser(name, username, email, password)).toThrowError(new TypeError('username is not a string'))
            })

            it('should throw error when username is empty', () => {
                const name = 'sergio'
                const username = ''
                const email = 'sergio@gmail.com'
                const password = '123456'
                expect(() => logic.registerUser(name, username, email, password)).toThrowError(new Error('username is empty'))
            })

            it('should throw error when email is array', () => {
                const name = 'sergio'
                const username = 'sergi23'
                const email = []
                const password = '123456'
                expect(() => logic.registerUser(name, username, email, password)).toThrowError(new TypeError('email is not a string'))
            })

            it('should throw error when email is empty', () => {
                const name = 'sergio'
                const username = 'sergi23'
                const email = ''
                const password = '123456'
                expect(() => logic.registerUser(name, username, email, password)).toThrowError(new Error('email is empty'))
            })


            it('should throw error when emailConfirm is array', () => {
                const name = 'sergio'
                const username = 'sergi23'
                const email = 'sergio@sergio.com'
                const emailConfirm = []
                const password = '123456'
                expect(() => logic.registerUser(name, username, email, emailConfirm, password)).toThrowError(new TypeError('emailConfirm is not a string'))
            })

            it('should throw error when emailConfirm is empty', () => {
                const name = 'sergio'
                const username = 'sergi23'
                const email = 'sergio@sergio.com'
                const emailConfirm = ''
                const password = '123456'
                expect(() => logic.registerUser(name, username, email, emailConfirm, password)).toThrowError(new Error('emailConfirm is empty'))
            })


            it('should throw error when email and emailConfirm are diferent', () => {
                const name = 'sergio'
                const username = 'sergi23'
                const email = 'sergio@sergio.com'
                const emailConfirm = 'se'
                const password = '123456'
                expect(() => logic.registerUser(name, username, email, emailConfirm, password)).toThrowError(new Error('email and emailConfirm are diferent'))
            })

            it('should throw error when password is array', () => {
                const name = 'sergio'
                const username = 'sergi23'
                const email = 'sergio@sergio.com'
                const emailConfirm = 'sergio@sergio.com'
                const password = []
                expect(() => logic.registerUser(name, username, email, emailConfirm, password)).toThrowError(new TypeError('password is not a string'))
            })

            it('should throw error when password is empty', () => {
                const name = 'sergio'
                const username = 'sergi23'
                const email = 'sergio@sergio.com'
                const emailConfirm = 'sergio@sergio.com'
                const password = ''
                expect(() => logic.registerUser(name, username, email, emailConfirm, password)).toThrowError(new Error('password is empty'))
            })

            it('should throw error when passwordConfirm is array', () => {
                const name = 'sergio'
                const username = 'sergi23'
                const email = 'sergio@sergio.com'
                const emailConfirm = 'sergio@sergio.com'
                const password = '123456'
                const passwordConfirm = []
                expect(() => logic.registerUser(name, username, email, emailConfirm, password, passwordConfirm)).toThrowError(new TypeError('passwordConfirm is not a string'))
            })

            it('should throw error when passwordConfirm is empty', () => {
                const name = 'sergio'
                const username = 'sergi23'
                const email = 'sergio@sergio.com'
                const emailConfirm = 'sergio@sergio.com'
                const password = '123456'
                const passwordConfirm = ''
                expect(() => logic.registerUser(name, username, email, emailConfirm, password, passwordConfirm)).toThrowError(new Error('passwordConfirm is empty'))
            })

            it('should throw error when password and passwordConfirm are diferent', () => {
                const name = 'sergio'
                const username = 'sergi23'
                const email = 'sergio@sergio.com'
                const emailConfirm = 'sergio@sergio.com'
                const password = '12345623423'
                const passwordConfirm = '33'
                expect(() => logic.registerUser(name, username, email, emailConfirm, password, passwordConfirm)).toThrowError(new Error('password and passwordConfirm are diferent'))
            })
        })
    })

    describe('login user', () => {

        describe('loginUser - ERROR', () => {

            it('should throw error when email is array', () => {

                const email = []
                const password = '123456'
                expect(() => logic.loginUser(email, password)).toThrowError(new TypeError('email is not a string'))
            })

            it('should throw error when email is empty', () => {

                const email = ''
                const password = '123456'
                expect(() => logic.loginUser(email, password)).toThrowError(new Error('email is empty'))
            })

            it('should throw error when password is array', () => {

                const email = 'sergio@sergio.com'
                const password = []
                expect(() => logic.loginUser(email, password)).toThrowError(new TypeError('password is not a string'))
            })

            it('should throw error when password is empty', () => {

                const email = 'sergio@sergio.com'
                const password = ''
                expect(() => logic.loginUser(email, password)).toThrowError(new Error('password is empty'))
            })
        })
    })

    describe('updateUser', () => {

        describe('updateUser - ERROR', () => {

            it('should throw error when userData is array', () => {
                
                const userData = []
              
                expect(() => logic.updateUser(userData)).toThrowError(new TypeError('userData is not an Object'))
            })
        })

    })

    describe('searchCongresses', () => {

        describe('searchCongresses - ERROR', () => {

            it('should throw error when query is array', () => {
                
                const query = []
              
                expect(() => logic.searchCongresses(query)).toThrowError(new TypeError(`query is not a string`))
            })

            it('should throw error when query is empty', () => {
                
                const query = ''
              
                expect(() => logic.searchCongresses(query)).toThrowError(new TypeError(`query is empty`))
            })
        })
    })
    
    describe('searchArtist', () => {

        describe('searchArtist - ERROR', () => {

            it('should throw error when query is array', () => {
                
                const query = []
              
                expect(() => logic.searchArtist(query)).toThrowError(new TypeError(`query is not a string`))
            })

            it('should throw error when query is empty', () => {
                
                const query = ''
              
                expect(() => logic.searchArtist(query)).toThrowError(new TypeError(`query is empty`))
            })
        })
    })

    describe('searchItems', () => {

        describe('searchItems - ERROR', () => {

            it('should throw error when query is array', () => {
                
                const query = []
              
                expect(() => logic.searchItems(query)).toThrowError(new TypeError(`query is not a string`))
            })

            it('should throw error when query is empty', () => {
                
                const query = ''
              
                expect(() => logic.searchItems(query)).toThrowError(new Error(`query is empty`))
            })
        })
    })

    describe('createArtist', () => {

        describe('createArtist - ERROR', () => {

            it('should throw error when artistData is array', () => {
                
                const artistData = []
              
                expect(() => logic.createArtist(artistData)).toThrowError(new TypeError('artistData is not an Object'))
            })
            
        })
    })

    describe('createCongress', () => {

        describe('createCongress - ERROR', () => {

            it('should throw error when data is array', () => {
                
                const data = []
              
                expect(() => logic.createCongress(data)).toThrowError(new TypeError('data is not an Object'))
            })
            
        })
    })

    describe('toggleFavorites', () => {

        describe('toggleFavorites - ERROR', () => {

            it('should throw error when itemId is array', () => {
                
                const itemId = []
              
                expect(() => logic.toggleFavorites(itemId)).toThrowError(new Error('itemId is not a string'))
            })

            it('should throw error when itemId is empty', () => {
                
                const itemId = ''
              
                expect(() => logic.toggleFavorites(itemId)).toThrowError(new Error('itemId is empty'))
            })
            
        })
    })

    describe('itemDetail', () => {

        describe('itemDetail - ERROR', () => {

            it('should throw error when itemId is array', () => {
                
                const itemId = []
              
                expect(() => logic.itemDetail(itemId)).toThrowError(new Error('itemId is not a string'))
            })

            it('should throw error when itemId is empty', () => {
                
                const itemId = ''
              
                expect(() => logic.itemDetail(itemId)).toThrowError(new Error('itemId is empty'))
            })
            
        })
    })
    

})