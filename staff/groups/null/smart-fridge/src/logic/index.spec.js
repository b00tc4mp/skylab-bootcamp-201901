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
                .then(id => expect(id).toBeDefined())
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

        let _id

        logic.register(name, surname, username, password, passwordConfirm, gender, height, weight, birthDate, lifeStyle)
            .then(id => _id = id)
        
        it('should succeed on correct data', () =>
            logic.login(username, password)
                .then(({ id, token }) => {
                    expect(id).toBe(_id)
                    expect(token).toBeDefined()
                })
        )
        it('should fail on too few arguments', () =>
            expect(() => {
                logic.login(username)
            }).toThrow(Error('All arguments were not introduced in the function'))
        )
        it('should fail on too many arguments', () =>
            expect(() => {
                logic.login(username, password, 'test')
            }).toThrow(Error('Too many arguments were introduced in the function'))
        )
    })
    describe('retrieve', () => {
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

        let _id, _token

        logic.register(name, surname, username, password, passwordConfirm, gender, height, weight, birthDate, lifeStyle)
            .then(id => _id = id)
            .then(() => logic.login(username, password))
            .then(({ token }) => _token = token)

        it('should succeed on correct data', () =>
            logic.retrieve(_id, _token)
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.username).toBe(username)
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
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'
        const passwordConfirm = '123'
        const gender = 'female'
        const birthDate = '1985/10/15'
        const height = 161
        const weight = 60
        const lifeStyle = 'sedentary'

        const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

        let _id, _token

        logic.register(name, surname, username, password, passwordConfirm, gender, height, weight, birthDate, lifeStyle)
            .then(id => _id = id)
            .then(() => logic.login(username, password))
            .then(({ token }) => _token = token)

        it('should succeed on correct data', () => {
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

            return logic.update(_id, _token, data)
                .then(() => logic.retrieve(_id, _token))
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(data.name)
                    expect(user.surname).toBe(data.surname)
                    expect(user.age).toBe(data.age)
                    expect(user.username).toBe(username)
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
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'
        const passwordConfirm = '123'
        const gender = 'female'
        const birthDate = '1985/10/15'
        const height = 161
        const weight = 60
        const lifeStyle = 'sedentary'

        let _id, _token

        logic.register(name, surname, username, password, passwordConfirm, gender, height, weight, birthDate, lifeStyle)
            .then(id => _id = id)
            .then(() => logic.login(username, password))
            .then(({ token }) => _token = token)
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
            let calA = 591
            let calB = 722
            let diet = 'balanced'
            let health = 'alcohol-free'
            it('should succeed on matching query', () => {
                
                return logic.search(query, calA, calB, diet, health)
                    .then(recipes => {
                        expect(recipes).toBeDefined()
                        expect(recipes instanceof Array).toBeTruthy()
                        expect(recipes.length).toBeGreaterThan(0)
                    })
            })
            it('should fail on non-numeric calories', () =>  {

                calA = 500
                calB = 400

                expect(() => {
                    logic.search(query, calA, calB, diet, health)
                }).toThrow(Error('Cannot calculate this range of calories'))
            })
            it('should fail on non-existing calories', () =>  {

                calA = undefined
                calB = undefined

                expect(() => {
                    logic.search(query, calA, calB, diet, health)
                }).toThrow(Error('Calories range was not input'))
            })
            it('should fail on number diet instead of string', () =>  {

                calA = 591
                calB = 722
                diet = 4

                expect(() => {
                    logic.search(query, calA, calB, diet, health)
                }).toThrow(Error(diet + ' is not a string'))
            })
            it('should fail on number health instead of string', () =>  {

                diet = 'balanced'
                health = 4

                expect(() => {
                    logic.search(query, calA, calB, diet, health)
                }).toThrow(Error(health + ' is not a string'))
            })
        })
        
    })
})