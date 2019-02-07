import logic from '.'

describe('logic', () => {
    describe('caloriesCounter', () => {
        let gender = 'female'
        let height = 161
        let weight = 60
        let birthDate = '1985/10/15'
        let lifeStyle = 'sedentary'
        it('should succeed with correct params', () => {
            
            const test = logic.caloriesCounter(gender, height, weight, birthDate, lifeStyle)

            expect(test).toEqual(1959)
        })
        it('should fail on boolean gender instead of string', () => {

            gender = true
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, lifeStyle)
            }).toThrow(TypeError(gender + ' is not a string'))
        })
        it('should fail on object gender instead of string', () => {

            gender = {}
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, lifeStyle)
            }).toThrow(TypeError(gender + ' is not a string'))
        })
        it('should fail on number gender instead of string', () => {

            gender = 49
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, lifeStyle)
            }).toThrow(TypeError(gender + ' is not a string'))
        })
        it('should fail on array gender instead of string', () => {

            gender = []
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, lifeStyle)
            }).toThrow(TypeError(gender + ' is not a string'))
        })
        it('should fail on object heigth instead of number', () => {

            gender = 'female'
            height = {}
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, lifeStyle)
            }).toThrow(TypeError(height + ' is not a number'))
        })
        it('should fail on array heigth instead of number', () => {

            height = []
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, lifeStyle)
            }).toThrow(TypeError(height + ' is not a number'))
        })
        it('should fail on string heigth instead of number', () => {

            height = 'test'
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, lifeStyle)
            }).toThrow(TypeError(height + ' is not a number'))
        })
        it('should fail on out of range height', () => {

            height = 1200
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, lifeStyle)
            }).toThrow(Error(height + ' should be a number between 50 and 230'))
        })
        it('should fail on array weight instead of number', () => {

            height = 161
            weight = []
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, lifeStyle)
            }).toThrow(TypeError(weight + ' is not a number'))
        })
        it('should fail on string weight instead of number', () => {

            weight = 'test'
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, lifeStyle)
            }).toThrow(TypeError(weight + ' is not a number'))
        })
        it('should fail on boolean weight instead of number', () => {

            weight = false
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, lifeStyle)
            }).toThrow(TypeError(weight + ' is not a number'))
        })
        it('should fail on out of range weight', () => {

            weight = 213123
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, lifeStyle)
            }).toThrow(Error(weight + ' should be a number between 20 and 400'))
        })
        it('should fail on number birthDate instead of string', () => {

            weight = 60
            birthDate = 123213
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, lifeStyle)
            }).toThrow(TypeError(birthDate + ' is not a string'))
        })
        it('should fail on object birthDate instead of string', () => {

            birthDate = {}
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, lifeStyle)
            }).toThrow(TypeError(birthDate + ' is not a string'))
        })
        it('should fail on object lifeStyle instead of string', () => {

            birthDate = '1985/10/15'
            lifeStyle = ''
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, lifeStyle)
            }).toThrow(Error('lifeStyle cannot be empty'))
        })
        it('should fail on array lifeStyle instead of string', () => {

            lifeStyle = []
            
            expect(() => {
                logic.caloriesCounter(gender, height, weight, birthDate, lifeStyle)
            }).toThrow(TypeError(lifeStyle + ' is not a string'))
        })
    })
    describe('register', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'
        const passwordConfirm = '123'
        const gender = 'female'
        const birthDate = '1985/10/15'
        const height = 161
        const weight = 60
        const lifeStyle = 'sedentary'

        it('should succeed on correct data', () =>
            logic.register(name, surname, username, password, passwordConfirm, gender, height, weight, birthDate, lifeStyle)
                .then(() => expect(logic.__userId__).toBeDefined())
        )
        it('should fail on too few arguments', () =>
            expect(() => {
                logic.register(name, surname, username, password, passwordConfirm, gender, height, weight, birthDate)
            }).toThrow(Error('All arguments were not introduced in the function'))
        )
        it('should fail on too many arguments', () =>
            expect(() => {
                logic.register(name, surname, username, password, passwordConfirm, gender, height, weight, birthDate, lifeStyle, 'test')
            }).toThrow(Error('Too many arguments were introduced in the function'))
        )
    })
    describe('login', () => {
        let _id, _token
        
        
        const name = 'Manuel'
        const surname = 'Barzi'
        let username
        const password = '123'
        const passwordConfirm = '123'
        const gender = 'female'
        const birthDate = '1985/10/15'
        const height = 161
        const weight = 60
        const lifeStyle='sedentary'
        
        beforeEach(()=>{
            username = `manuelbarzi-${Math.random()}`

            return logic.register(name, surname, username, password, passwordConfirm, gender, height, weight, birthDate, lifeStyle)
                .then(() => _id = logic.__userId__)
        })
      
        it('should succeed on correct data', () => 
            logic.login(username, password)
                .then(() => {
                    let loginId=logic.__userId__
                    _token=logic.__userApiToken__

                    expect(loginId).toBe(_id)
                    expect(_token).toBeDefined()
                })
        )

        it('should fail on too few arguments', () => {
            expect(() => {
                logic.login(username)
            }).toThrow(Error('All arguments were not introduced in the function'))
        })

        it('should fail on too many arguments', () => {
            expect(() => {
                logic.login(username, password, 'test')
            }).toThrow(Error('Too many arguments were introduced in the function'))
        })
    })
    describe('retrieve', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        let username
        const password = '123'
        const passwordConfirm = '123'
        const gender = 'female'
        const birthDate = '1985/10/15'
        const height = 161
        const weight = 60
        const lifeStyle = 'sedentary'

        let _id, _token

        beforeEach(() => {
            username = `manuelbarzi-${Math.random()}`
            
            return logic.register(name, surname, username, password, passwordConfirm, gender, height, weight, birthDate, lifeStyle)
                .then(() => logic.login(username, password))
                .then(() => {
                    _id = logic.__userId__
                    _token= logic.__userApiToken__
                } )
        })


        it('should succeed on correct data', () =>
            logic.retrieve(_id, _token)
                .then(() => {
                    expect(logic.__user__.name).toBe(name)
                    expect(logic.__user__.surname).toBe(surname)
                    expect(logic.__user__.gender).toBe(gender)
                    expect(logic.__user__.height).toBe(height)
                    expect(logic.__user__.weight).toBe(weight)
                    expect(logic.__user__.birthDate).toBe(birthDate)
                    expect(logic.__user__.lifeStyle).toBe(lifeStyle)
                })
        )
        it('should fail on too few arguments', () =>
            expect(() => {
                logic.retrieve(_id)
            }).toThrow(Error('All arguments were not introduced in the function'))
        )
        it('should fail on too many arguments', () =>
            expect(() => {
                logic.retrieve(_id, _token, 'test')
            }).toThrow(Error('Too many arguments were introduced in the function'))
        )
    })
    describe('update', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        let username
        const password = '123'
        const passwordConfirm = '123'
        const gender = 'female'
        const birthDate = '1985/10/15'
        const height = 161
        const weight = 60
        const lifeStyle = 'sedentary'

        const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

        let _id, _token


        beforeEach(() => {

            username = `manuelbarzi-${Math.random()}`

            return logic.register(name, surname, username, password, passwordConfirm, gender, height, weight, birthDate, lifeStyle)
                .then(() => logic.login(username, password))
                .then(() => {
                    _id = logic.__userId__
                    _token = logic.__userApiToken__
                })
        })

        it('should succeed on correct data', () => {
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

            return logic.update(_id, _token, data)
                .then(() => logic.retrieve(_id, _token))
                .then(() => {
                    expect(logic.__user__.name).toBe(data.name)
                    expect(logic.__user__.surname).toBe(data.surname)
                    expect(logic.__user__.age).toBe(data.age)
                })
        })
        it('should fail on too few arguments', () =>
            expect(() => {
                logic.update(_id, _token)
            }).toThrow(Error('All arguments were not introduced in the function'))
        )
        it('should fail on too many arguments', () =>
            expect(() => {
                logic.update(_id, _token, data, 'test')
            }).toThrow(Error('Too many arguments were introduced in the function'))
        )
    })
    describe('remove', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        let username
        const password = '123'
        const passwordConfirm = '123'
        const gender = 'female'
        const birthDate = '1985/10/15'
        const height = 161
        const weight = 60
        const lifeStyle = 'sedentary'

        let _id, _token

        beforeEach(() => {
            username = `manuelbarzi-${Math.random()}`
            
            return logic.register(name, surname, username, password, passwordConfirm, gender, height, weight, birthDate, lifeStyle)
                .then(() => logic.login(username, password))
                .then(() => {
                    _id = logic.__userId__
                    _token = logic.__userApiToken__
                })
        })
        it('should succeed on correct data', () => {
            return logic.remove(_id, _token, username, password)
                .then(() => logic.retrieve(_id, _token))
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(({message}) => expect(message).toBe(`user with id \"${_id}\" does not exist`))
        })
        it('should fail on too few arguments', () =>
            expect(() => {
                logic.remove(_id, _token, username)
            }).toThrow(Error('All arguments were not introduced in the function'))
        )
        it('should fail on too many arguments', () =>
            expect(() => {
                logic.remove(_id, _token, username, password, 'test')
            }).toThrow(Error('Too many arguments were introduced in the function'))
        )
    })
    describe('edamam api', () => {
        describe('search recipes', () => {
            let query = 'chicken'
            let calories = '700'
            let diet = 'balanced'
            let health = ['vegan','vegetarian']
            it('should succeed on matching query', () => {
                
                return logic.search(query, calories, diet, health)
                    .then(recipes => {
                        expect(recipes).toBeDefined()
                        expect(recipes instanceof Array).toBeTruthy()
                        expect(recipes.length).toBeGreaterThan(0)
                    })
            })
            it('should fail on non-string calories', () =>  {

                calories = 4

                expect(() => {
                    logic.search(query, calories, diet, health)
                }).toThrow(TypeError(calories + ' is not a string'))
            })
            it('should fail on non-existing calories', () =>  {

                calories = undefined

                expect(() => {
                    logic.search(query, calories, diet, health)
                }).toThrow(Error('Calories range was not input'))
            })
            it('should fail on number diet instead of string', () =>  {

                calories = '700'
                diet = 4

                expect(() => {
                    logic.search(query, calories, diet, health)
                }).toThrow(Error(diet + ' is not a string'))
            })
            it('should fail on number health instead of array', () =>  {

                diet = 'balanced'
                health = 4

                expect(() => {
                    logic.search(query, calories, diet, health)
                }).toThrow(Error(health + ' is not an array'))
            })
            it('should succeed on empty array health', () =>  {

                health = []

                return logic.search(query, calories, diet, health)
                    .then(recipes => {
                        expect(recipes).toBeDefined()
                        expect(recipes instanceof Array).toBeTruthy()
                        expect(recipes.length).toBeGreaterThan(0)
                    })
            })
            it('should work on empty array health', () =>  {

                health = ['vegan', 'vegetarian']
                diet = 'indifferent'

                return logic.search(query, calories, diet, health)
                    .then(recipes => {
                        expect(recipes).toBeDefined()
                        expect(recipes instanceof Array).toBeTruthy()
                        expect(recipes.length).toBeGreaterThan(0)
                    })
            })
        })
        
    })

    afterEach(()=>{
        logic.__userApiToken__=null
        logic.__userId__=null
        logic.__user__=null
    })
})