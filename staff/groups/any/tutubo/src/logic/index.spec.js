import logic from '.'
import '../index'


describe('logic', () => {
    describe('register user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on valid data', () =>
            logic.registerUser(name, surname, email, password)
                .then(result => expect(result).toBeUndefined())
        )

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError('name cannot be empty'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on undefined surname', () => {
            const name = 'Manuel'
            const surname = undefined
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Manuel'
            const surname = 10
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const name = 'Manuel'
            const surname = false
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Manuel'
            const surname = {}
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'Manuel'
            const surname = []
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Manuel'
            const surname = ''
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('surname cannot be empty'))
        })
    })

    describe('login user', () => {
        const email = `e@mail.com`
        const password = 'p'

        it('should succeed on valid data', () =>
            logic.loginUser(email, password)
                .then(result => expect(result).toBeUndefined())
        )

        it('should fail on undefined email', () => {
            const email = undefined
            const password = '123'

            expect(() => {
                logic.loginUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on numeric email', () => {
            const email = 1238378
            const password = '123'

            expect(() => {
                logic.loginUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })


        it('should fail on boolean email', () => {
            const email = true
            const password = '123'

            expect(() => {
                logic.loginUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const email = {}
            const password = '123'

            expect(() => {
                logic.loginUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on array email', () => {
            const email = []
            const password = '123'

            expect(() => {
                logic.loginUser(email, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const email = ''
            const password = '123'

            expect(() => {
                logic.loginUser(email, password)
            }).toThrow(Error('email cannot be empty'))
        })

        it('should fail on undefined password', () => {
            const email = 'manuelbarzi@mail.com'
            const password = undefined

            expect(() => {
                logic.loginUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const email = 'manuelbarzi@mail.com'
            const password = 123

            expect(() => {
                logic.loginUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })


        it('should fail on boolean password', () => {
            const email = 'manuelbarzi@mail.com'
            const password = true

            expect(() => {
                logic.loginUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on object password', () => {
            const email = 'manuelbarzi@mail.com'
            const password = {}

            expect(() => {
                logic.loginUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on array password', () => {
            const email = 'manuelbarzi@mail.com'
            const password = []

            expect(() => {
                logic.loginUser(email, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const email = 'manuelbarzi@mail.com'
            const password = ''

            expect(() => {
                logic.loginUser(email, password)
            }).toThrow(Error('password cannot be empty'))
        })
    })

    describe('update user', () => {
        it('should succeed on valid data', () => {
            logic.updateUser({"gslmds": "dlcsdl"})
                .then(nothing => {
                    expect(nothing).toBeUndefined()
                })
        })
    })

    describe('retrieve user', () => {
        it('should succeed on valid data', () => {
            logic.retrieveUser()
                .then(items => {
                    expect(items).toBeDefined()
                })
        })
    })

    describe('searchVideos', () => {
        it('should succed', () =>
            logic.searchVideo('madonna')
                .then(video => {
                    expect(video).toBeDefined()
                })

        )

        it('should succeed on valid query', () => {
            const query = 'viral videos'

            return logic.searchVideo(query)
                .then(items => {
                    expect(items).toBeDefined()
                    expect(items.length).toBe(undefined)
                    expect(items).toBeInstanceOf(Object)
                })
        })

        it('should fail with no matching query', () => {
            logic.searchVideo('dmvkjadv djksv dkjs,cmnd kvmnc xckja,smdnvskja,dbdsjmcnajdfbv')
                .then(result => {
                    expect(result).toBeUndefined()
                })
        })

        it('should fail on empty query', () => {
            expect(() => logic.searchVideo('')).toThrowError('query is empty')
                
        })

        it('should fail on object for query', () => {
            expect(() => logic.searchVideo({})).toThrowError('[object Object] is not a string')
        })
    })

    describe('popular results', () => {
        it('should return random videos', () => {
            logic.popularResults()
                .then(video => {
                    expect(video.items).toBeDefined()
                    expect(video).toBeInstanceOf(Object)
                })
        })
    })

    describe('watch video', () => {
        it('should return video info', () => {
            const videoId = "FWYsvw_U3Zw"
            logic.watchVideo(videoId)
                .then(video => {
                    expect(video).toBeDefined()
                })
        })

        it('should fail on invalid video Id', () => {
            const videoId = "FWYsvscnkadnaw_U3Zw"
            logic.watchVideo(videoId)
                .then(video => {
                    expect(video).toBeUndefined()
                })
        })
    })

    describe('comment video', () => {
        it('should update api with comments', () => {
            const videoId = "FWYsvw_U3Zw"
            const text = "cool"
            logic.commentVideo(videoId, text)
                .then(comments => {
                    expect(comments).toBeDefined()
                })
        })

        it('should fail on invalid video Id', () => {
            const videoId = "FWYsvscnkadnaw_U3Zw"
            logic.watchVideo(videoId)
                .then(comments => {
                    expect(comments).toBeUndefined()
                })
        })
    })

    describe('show comments', () => {
        it('should return comments', () => {
            logic.showComments()
                .then(comments => {
                    expect(comments).toBeDefined()
                })
        })

        it('should fail on invalid video Id', () => {
            const videoId = "FWYsvscnkadnaw_U3Zw"
            logic.watchVideo(videoId)
                .then(comments => {
                    expect(comments).toBeUndefined()
                })
        })
    })

    describe('delete comments', () => {
        it('should delete selected comment', () => {
            logic.deleteComments()
                .then(comments => {
                    expect(comments.comment).toBeUndefined()
                })
        })

        it('should fail on invalid video Id', () => {
            const videoId = "FWYsvscnkadnaw_U3Zw"
            logic.watchVideo(videoId)
                .then(comments => {
                    expect(comments).toBeUndefined()
                })
        })
    })

    describe('like video', () => {
        it('should put video id in user api', () => {
            logic.likeVideo()
                .then(likes => {
                    expect(likes).toBeDefined()
                })
        })

        it('should fail on invalid video Id', () => {
            const videoId = "FWYsvscnkadnaw_U3Zw"
            logic.likeVideo(videoId)
                .then(likes => {
                    expect(likes).toBeUndefined()
                })
        })

        it ('should fail on numver for id', () => {
            const videoId = 123444554
            logic.likeVideo(videoId)
                .then(likes => {
                    expect(likes).toBeUndefined()
                })
        })
    })

    describe('retrieve likes', () => {
        it('should return likes videos', () => {
            logic.likeVideo()
                .then(likes => {
                    expect(likes).toBeDefined()
                })
        })
    })

})