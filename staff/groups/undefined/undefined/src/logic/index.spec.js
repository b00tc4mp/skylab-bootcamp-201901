import logic from "../logic/index";
import userApi from '../user-api'




describe('logic' , () => {
    
    describe('searchItems' , () => {
                
        it('should succeed on mathing query' , () => {
            const query = 'titanic'
            
            
            return logic.searchVideos(query)
            .then(items => {
                expect(items).toBeDefined()
                expect(items instanceof Array).toBeTruthy()
                expect(items.length).toBeGreaterThan(0)
            })
        })

        it('should fail on empty query' , () => {
            const query = ''
            expect(() => logic.searchVideos(query)).toThrowError('query is empty')
           
        })

        it('should fail on undefined query' , () => {
            const query = undefined
            expect(() => logic.searchVideos(query)).toThrowError(`${query} is not a string`)
           
        })

        it('should fail on null query' , () => {
            const query = null
            expect(() => logic.searchVideos(query)).toThrowError(`${query} is not a string`)
           
        })

        it('should fail on number query' , () => {
            const query = 123
            expect(() => logic.searchVideos(query)).toThrowError(`${query} is not a string`)
           
        })

        it('should fail on boolean query' , () => {
            const query = true
            expect(() => logic.searchVideos(query)).toThrowError(`${query} is not a string`)
           
        })

        it('should fail on array query' , () => {
            const query = []
            expect(() => logic.searchVideos(query)).toThrowError(`${query} is not a string`)
           
        })

        it('should fail on object query' , () => {
            const query = {}
            expect(() => logic.searchVideos(query)).toThrowError(`${query} is not a string`)
           
        })

    })

    
    describe('retrieveItem' , () => {

        it('should retrieve an item when correct itemId is used' , () => {
            const videoId = 'tt0108778'
            
            return logic.retrieveVideo(videoId)
            .then(item => {
                const {imdbID} = item
                expect(imdbID).toBeDefined()
                expect(imdbID).toBe(videoId)
            })

        })

        it('should fail on empty videoId', () => {
            const videoId = ''
            
            expect(() => logic.retrieveVideo(videoId)).toThrowError('videoId is empty')
        })


        it('should fail on undefined videoId' , () => {
            const videoId = undefined
            expect(() => logic.retrieveVideo(videoId)).toThrowError(`${videoId} is not a string`)
           
        })

        it('should fail on null videoId' , () => {
            const videoId = null
            expect(() => logic.retrieveVideo(videoId)).toThrowError(`${videoId} is not a string`)
           
        })

        it('should fail on number videoId' , () => {
            const videoId = 123
            expect(() => logic.retrieveVideo(videoId)).toThrowError(`${videoId} is not a string`)
           
        })

        it('should fail on boolean videoId' , () => {
            const videoId = true
            expect(() => logic.retrieveVideo(videoId)).toThrowError(`${videoId} is not a string`)
           
        })

        it('should fail on array videoId' , () => {
            const videoId = []
            expect(() => logic.retrieveVideo(videoId)).toThrowError(`${videoId} is not a string`)
           
        })

        it('should fail on object videoId' , () => {
            const videoId = {}
            expect(() => logic.retrieveVideo(videoId)).toThrowError(`${videoId} is not a string`)
           
        })

    })

    describe('registerUser' , () => {
        const name = 'Jony'
        const surname = 'Fernandez'
        const email = `juas@juju.com-${Math.random()}`
        const password = '123'
        const passwordConfirmation = '123'

        it('should succeed on valid data', () =>
            logic.registerUser(name, surname, email, password, passwordConfirmation) 
                .then(result => expect(result).toBeUndefined())
        )


        it('should fail when name is undefined' , ()  => {
            const name = undefined
            const surname = 'Fernandez'
            const email = 'juas@juju.com'
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${name} is not a string`)

        })

        it('should fail when name is null' , ()  => {
            const name = null
            const surname = 'Fernandez'
            const email = 'juas@juju.com'
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${name} is not a string`)
        })

        it('should fail when name is number' , ()  => {
            const name = 123
            const surname = 'Fernandez'
            const email = 'juas@juju.com'
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${name} is not a string`)

        })

        it('should fail when name is booelan' , ()  => {
            const name = true
            const surname = 'Fernandez'
            const email = 'juas@juju.com'
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${name} is not a string`)

        })

        it('should fail when name is array' , ()  => {
            const name = []
            const surname = 'Fernandez'
            const email = 'juas@juju.com'
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${name} is not a string`)

        })

        it('should fail when name is object' , ()  => {
            const name = {}
            const surname = 'Fernandez'
            const email = 'juas@juju.com'
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${name} is not a string`)

        })

        it('should fail when name is empty' , ()  => {
            const name = ''
            const surname = 'Fernandez'
            const email = 'juas@juju.com'
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError('name cannot be empty')

        })

        it('should fail when surname is undefined' , ()  => {
            const name = 'Jony'
            const surname = undefined
            const email = 'juas@juju.com'
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${surname} is not a string`)

        })

        it('should fail when surname is null' , ()  => {
            const name = 'Jony'
            const surname = null
            const email = 'juas@juju.com'
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${surname} is not a string`)

        })

        it('should fail when surname is number' , ()  => {
            const name = 'Jony'
            const surname = 123
            const email = 'juas@juju.com'
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${surname} is not a string`)

        })

        it('should fail when surname is boolean' , ()  => {
            const name = 'Jony'
            const surname = true
            const email = 'juas@juju.com'
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${surname} is not a string`)

        })

        it('should fail when array is undefined' , ()  => {
            const name = 'Jony'
            const surname = []
            const email = 'juas@juju.com'
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${surname} is not a string`)

        })

        it('should fail when surname is object' , ()  => {
            const name = 'Jony'
            const surname = {}
            const email = 'juas@juju.com'
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${surname} is not a string`)

        })

        it('should fail when surname is empty' , ()  => {
            const name = 'Jony'
            const surname = ''
            const email = 'juas@juju.com'
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError('surname cannot be empty')

        })

        it('should fail when email is undefined' , ()  => {
            const name = 'Jony'
            const surname = 'Fernandez'
            const email = undefined
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${email} is not a string`)

        })

        it('should fail when email is null' , ()  => {
            const name = 'Jony'
            const surname = 'Fernandez'
            const email = null
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${email} is not a string`)

        })

        it('should fail when email is number' , ()  => {
            const name = 'Jony'
            const surname = 'Fernandez'
            const email = 123
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${email} is not a string`)

        })

        it('should fail when email is boolean' , ()  => {
            const name = 'Jony'
            const surname = 'Fernandez'
            const email = true
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${email} is not a string`)

        })

        it('should fail when email is array' , ()  => {
            const name = 'Jony'
            const surname = 'Fernandez'
            const email = []
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${email} is not a string`)

        })

        it('should fail when email is object' , ()  => {
            const name = 'Jony'
            const surname = 'Fernandez'
            const email = {}
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${email} is not a string`)

        })

        it('should fail when email is empty' , ()  => {
            const name = 'Jony'
            const surname = 'Fernandez'
            const email = ''
            const password = 'p'

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError('email cannot be empty')

        })

        it('should fail when password is undefined' , ()  => {
            const name = 'Jony'
            const surname = 'Fernandez'
            const email = 'juas@juju.com'
            const password = undefined

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${password} is not a string`)

        })

        it('should fail when password is null' , ()  => {
            const name = 'Jony'
            const surname = 'Fernandez'
            const email = 'juas@juju.com'
            const password = null

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${password} is not a string`)

        })

        it('should fail when password is number' , ()  => {
            const name = 'Jony'
            const surname = 'Fernandez'
            const email = 'juas@juju.com'
            const password = 123

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${password} is not a string`)

        })

        it('should fail when password is boolean' , ()  => {
            const name = 'Jony'
            const surname = 'Fernandez'
            const email = 'juas@juju.com'
            const password = true

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${password} is not a string`)

        })

        it('should fail when password is array' , ()  => {
            const name = 'Jony'
            const surname = 'Fernandez'
            const email = 'juas@juju.com'
            const password = []

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${password} is not a string`)

        })

        it('should fail when password is object' , ()  => {
            const name = 'Jony'
            const surname = 'Fernandez'
            const email = 'juas@juju.com'
            const password = {}

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`${password} is not a string`)

        })

        it('should fail when password is empty' , ()  => {
            const name = 'Jony'
            const surname = 'Fernandez'
            const email = 'juas@juju.com'
            const password = ''

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`password cannot be empty`)

        })

        it('should fail when password is empty' , ()  => {
            const name = 'Jony'
            const surname = 'Fernandez'
            const email = 'juas@juju.com'
            const password = ''

            expect(() => logic.registerUser(name,surname,email,password)).toThrowError(`password cannot be empty`)

        })


        it('should fail when passwordConfirmation is empty' , ()  => {
            const name = 'Jony'
            const surname = 'Fernandez'
            const email = 'juas@juju.com'
            const password = '123'
            const passwordConfirmation = ''

            expect(() => logic.registerUser(name,surname,email,password, passwordConfirmation)).toThrowError('password confirmation cannot be empty')

        })


        it('should fail when passwordConfirmation is undefined' , ()  => {
            const name = 'Jony'
            const surname = 'Fernandez'
            const email = 'juas@juju.com'
            const password = '123'
            const passwordConfirmation = undefined

            expect(() => logic.registerUser(name,surname,email,password, passwordConfirmation)).toThrowError(`${passwordConfirmation} is not a string`)

        })

        it('should fail when passwordConfirmation is not equal to password' , ()  => {
            const name = 'Jony'
            const surname = 'Fernandez'
            const email = 'juas@juju.com'
            const password = '123'
            const passwordConfirmation = '321'

            expect(() => logic.registerUser(name,surname,email,password, passwordConfirmation)).toThrowError('passwords do not match')

        })
        
    })    
    describe('loginUser' , () => {

        const name = 'Jony'
        const surname = 'Fernandez'
        let email
        let password
        const passwordConfirmation = '123'

        
        beforeEach(() => { 
            email = `juas@juju.com-${Math.random()}`
            password = '123'
            return logic.registerUser(name, surname, email, password, passwordConfirmation)
        }
        )

        it('should succeed on correct credentials', () => 
            logic.loginUser(email, password)
                .then(() => {
                    expect(logic.__userId__).toBeDefined()
                    expect(logic.__userApiToken__).toBeDefined()
                })
        )

        it('should fail when email is null' , ()  => {
            email = null

            expect(() => logic.loginUser(null,password)).toThrowError(`${email} is not a string`)

        })

        it('should fail when email is number' , ()  => {
            email = 123

            expect(() => logic.loginUser(email,password)).toThrowError(`${email} is not a string`)

        })

        it('should fail when email is boolean' , ()  => {
            email = true

            expect(() => logic.loginUser(email,password)).toThrowError(`${email} is not a string`)

        })

        it('should fail when email is array' , ()  => {
            email = []

            expect(() => logic.loginUser(email,password)).toThrowError(`${email} is not a string`)

        })

        it('should fail when email is object' , ()  => {
            email = {}

            expect(() => logic.loginUser(email,password)).toThrowError(`${email} is not a string`)

        })

        it('should fail when email is empty' , ()  => {
            email = ''

            expect(() => logic.loginUser(email,password)).toThrowError('email cannot be empty')

        })

        it('should fail when password is undefined' , ()  => {
            password = undefined

            expect(() => logic.loginUser(email,password)).toThrowError(`${password} is not a string`)

        })

        it('should fail when password is null' , ()  => {
            password = null

            expect(() => logic.loginUser(email,password)).toThrowError(`${password} is not a string`)

        })

        it('should fail when password is number' , ()  => {
            password = 123

            expect(() => logic.loginUser(email,password)).toThrowError(`${password} is not a string`)

        })

        it('should fail when password is boolean' , ()  => {
            password = true

            expect(() => logic.loginUser(email,password)).toThrowError(`${password} is not a string`)

        })

        it('should fail when password is array' , ()  => {
            password = []

            expect(() => logic.loginUser(email,password)).toThrowError(`${password} is not a string`)

        })

        it('should fail when password is object' , ()  => {
            password = {}

            expect(() => logic.loginUser(email,password)).toThrowError(`${password} is not a string`)

        })

        it('should fail when password is empty' , ()  => {
            password = ''

            expect(() => logic.loginUser(email,password)).toThrowError('password cannot be empty')

        })


    })

    describe('updateUser' , () => {
        it('should fail when favorites is undefined' , () => {
            const favorites = undefined
            expect(() =>  logic.updateUser(favorites)).toThrowError(`${favorites} is not an object`)


        })


        it('should fail when favorites is number' , () => {
            const favorites = 123
            expect(() =>  logic.updateUser(favorites)).toThrowError(`${favorites} is not an object`)


        })

       


    })

    describe('toogleFavorites' , () => {
        it('should fail when id is undefined' , () => {
            const id = undefined
            expect(() =>  logic.toggleFavorties(id)).toThrowError(`${id} is not a string`)


        })

        it('should fail when id is null' , () => {
            const id = null
            expect(() =>  logic.toggleFavorties(id)).toThrowError(`${id} is not a string`)


        })

        it('should fail when id is number' , () => {
            const id = 123
            expect(() =>  logic.toggleFavorties(id)).toThrowError(`${id} is not a string`)


        })

        it('should fail when id is array' , () => {
            const id = []
            expect(() =>  logic.toggleFavorties(id)).toThrowError(`${id} is not a string`)


        })

        it('should fail when id is boolea' , () => {
            const id = true
            expect(() =>  logic.toggleFavorties(id)).toThrowError(`${id} is not a string`)


        })

        it('should fail when id is object' , () => {
            const id = {}
            expect(() =>  logic.toggleFavorties(id)).toThrowError(`${id} is not a string`)


        })

        it('should fail when id is empty' , () => {
            const id = ''
            expect(() =>  logic.toggleFavorties(id)).toThrowError('id cannot be empty')


        })
        it('should succes on correct data' , () => {
        const name = 'Jony'
        const surname = 'Fernandez'
        const email = `juas@juju.com-${Math.random()}`
        const password = '123'
        const passwordConfirmation = '123'
        
            return logic.registerUser(name, surname, email, password,passwordConfirmation)
            .then(()=> logic.loginUser(email,password).then(()=> {
                return logic.toggleFavorties('id pelicula').then((user) => {
                    expect(user.favorites[0]).toBe('id pelicula')
                })
            }))
       
        
    
    
    
        })
        
    })


    
    
    
})