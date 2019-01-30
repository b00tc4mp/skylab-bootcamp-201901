spotifyApi.token = 'BQDv7Apw58YO9_zvTDCrr9DcOWKh6B6_g3Xo9PFO6fhm92ZC59S8NcGs9LPRMu-jLWc5_SfjI31MbU1Gb6MlmoA8X760bx3lfMmMuBkaS2eqmrMEwUkD7WkcBB-wWgW5ylWYNo35FkvD5H8'

describe('logic', function () {
    describe('login', function () {
        it('should succeed on correct credentials', function () {
            const expected = users.find(function (user) { return user.email === 'johndoe@mail.com' })

            let loggedInUser

            logic.login(expected.email, expected.password, function (user) {
                loggedInUser = user
            })

            expect(loggedInUser).toBeDefined()
            expect(loggedInUser.name).toEqual(expected.name)
            expect(loggedInUser.surname).toEqual(expected.surname)
            expect(loggedInUser.email).toEqual(expected.email)
            expect(loggedInUser.password).toBeUndefined()
            expect(loggedInUser).not.toEqual(expected)
        })

        it('should fail on wrong email', function () {
            const inventedEmail = 'invented@mail.com'

            // const error

            // try {
            //     logic.login(inventedEmail, '123', function() {})
            // } catch(err) {
            //     error = err
            // }

            // expect(error).toBeDefined()
            // expect(error.message).toBe('user ' + inventedEmail + ' not found')

            // ALT jasmine

            expect(function () {
                logic.login(inventedEmail, '123', function () { })
            }).toThrow(Error('user ' + inventedEmail + ' not found'))
        })

        it('should fail on wrong password', function () {
            expect(function () {
                logic.login('johndoe@mail.com', '123', function () { })
            }).toThrow(Error('wrong password'))
        })
    })

    describe('register', function () {
        const registeringEmail = 'jw@mail.com'

        beforeEach(function () {
            const userIndex = users.findIndex(function (user) { return user.email === registeringEmail })

            if (userIndex > -1)
                users.splice(userIndex, 1)
        })

        it('should succeed on valid data', function () {
            let registered

            const registeringName = 'John'
            const registeringSurname = 'Wayne'
            const registeringPassword = 'p4ssw0rd'

            logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                registered = true
            })

            expect(registered).toBeTruthy()

            let registeredUser = users.find(function (user) { return user.email === registeringEmail })

            expect(registeredUser).toBeDefined()
            expect(registeredUser.email).toEqual(registeringEmail)
            expect(registeredUser.name).toEqual(registeringName)
            expect(registeredUser.surname).toEqual(registeringSurname)
            expect(registeredUser.password).toEqual(registeringPassword)
        })

        it('should fail on undefined name', function () {
            let registered

            const registeringName = undefined
            const registeringSurname = 'Wayne'
            const registeringEmail = 'jw@mail.com'
            const registeringPassword = 'p4ssw0rd'

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true
                })
            }).toThrow(TypeError(registeringName + ' is not a string'))

            expect(registered).toBeUndefined()
        })

        it('should fail on numeric name', function () {
            let registered

            const registeringName = 10
            const registeringSurname = 'Wayne'
            const registeringEmail = 'jw@mail.com'
            const registeringPassword = 'p4ssw0rd'

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true
                })
            }).toThrow(TypeError(registeringName + ' is not a string'))

            expect(registered).toBeUndefined()
        })


        it('should fail on boolean name', function () {
            let registered

            const registeringName = true
            const registeringSurname = 'Wayne'
            const registeringEmail = 'jw@mail.com'
            const registeringPassword = 'p4ssw0rd'

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true
                })
            }).toThrow(TypeError(registeringName + ' is not a string'))

            expect(registered).toBeUndefined()
        })

        it('should fail on object name', function () {
            let registered

            const registeringName = {}
            const registeringSurname = 'Wayne'
            const registeringEmail = 'jw@mail.com'
            const registeringPassword = 'p4ssw0rd'

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true
                })
            }).toThrow(TypeError(registeringName + ' is not a string'))

            expect(registered).toBeUndefined()
        })

        it('should fail on array name', function () {
            let registered

            const registeringName = []
            const registeringSurname = 'Wayne'
            const registeringEmail = 'jw@mail.com'
            const registeringPassword = 'p4ssw0rd'

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true
                })
            }).toThrow(TypeError(registeringName + ' is not a string'))

            expect(registered).toBeUndefined()
        })

        it('should fail on empty name', function () {
            let registered

            const registeringName = ''
            const registeringSurname = 'Wayne'
            const registeringEmail = 'jw@mail.com'
            const registeringPassword = 'p4ssw0rd'

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true
                })
            }).toThrow(Error('name cannot be empty'))

            expect(registered).toBeUndefined()
        })

        it('should fail on undefined surname', function () {
            let registered

            const registeringName = 'John'
            const registeringSurname = undefined
            const registeringEmail = 'jw@mail.com'
            const registeringPassword = 'p4ssw0rd'

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true
                })
            }).toThrow(TypeError(registeringSurname + ' is not a string'))

            expect(registered).toBeUndefined()
        })

        it('should fail on numeric surname', function () {
            let registered

            const registeringName = 'John'
            const registeringSurname = 10
            const registeringEmail = 'jw@mail.com'
            const registeringPassword = 'p4ssw0rd'

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true
                })
            }).toThrow(TypeError(registeringSurname + ' is not a string'))

            expect(registered).toBeUndefined()
        })


        it('should fail on boolean surname', function () {
            let registered

            const registeringName = 'John'
            const registeringSurname = false
            const registeringEmail = 'jw@mail.com'
            const registeringPassword = 'p4ssw0rd'

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true
                })
            }).toThrow(TypeError(registeringSurname + ' is not a string'))

            expect(registered).toBeUndefined()
        })

        it('should fail on object surname', function () {
            let registered

            const registeringName = 'John'
            const registeringSurname = {}
            const registeringEmail = 'jw@mail.com'
            const registeringPassword = 'p4ssw0rd'

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true
                })
            }).toThrow(TypeError(registeringSurname + ' is not a string'))

            expect(registered).toBeUndefined()
        })

        it('should fail on array surname', function () {
            let registered

            const registeringName = 'John'
            const registeringSurname = []
            const registeringEmail = 'jw@mail.com'
            const registeringPassword = 'p4ssw0rd'

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true
                })
            }).toThrow(TypeError(registeringSurname + ' is not a string'))

            expect(registered).toBeUndefined()
        })

        it('should fail on empty surname', function () {
            let registered

            const registeringName = 'John'
            const registeringSurname = ''
            const registeringEmail = 'jw@mail.com'
            const registeringPassword = 'p4ssw0rd'

            expect(function () {
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true
                })
            }).toThrow(Error('surname cannot be empty'))

            expect(registered).toBeUndefined()
        })
    })

    describe('search artists', function () {
        it('should succeed on mathing query', function (done) {
            const query = 'madonna'

            logic.searchArtists(query, function (error, artists) {
                expect(error).toBeUndefined()

                expect(artists).toBeDefined()
                expect(artists instanceof Array).toBeTruthy()
                expect(artists.length).toBeGreaterThan(0)

                artists.forEach(({ name }) => expect(name.toLowerCase()).toContain(query))

                done()
            })
        })

        it('should fail on empty query', function () {
            const query = ''

            expect(() => logic.searchArtists(query, function (error, artists) { })).toThrowError('query is empty')
        })
    })
})