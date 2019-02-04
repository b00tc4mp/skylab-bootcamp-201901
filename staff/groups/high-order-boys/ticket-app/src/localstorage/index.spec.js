import userStorage from ".";

describe('localstorage', () => {
    const userData = {
        "id": "5c581438cd492a0009066e82",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNTgxNDM4Y2Q0OTJhMDAwOTA2NmU4MiIsImlhdCI6MTU0OTI3NjM4MiwiZXhwIjoxNTQ5Mjc5OTgyfQ.W3Rhocdt6egJ4ujjXBbqhi-eBrpkadCa-m71aruddY4"
    }

    it('should save user id and token when login (auth)', () => {
        userStorage.saveUserToken(userData)
        expect(userStorage.auth).toBeDefined()
    })

    it('should fail on saving user when data is array)', () => {
        expect(() => {
            userStorage.saveUserToken([])
        }).toThrow(TypeError('userData has to be an Object instance'))
    })

    it('should fail on saving user when data is a number)', () => {
        expect(() => {
            userStorage.saveUserToken(666)
        }).toThrow(TypeError('userData has to be an Object instance'))
    })

    it('should fail on saving user when data is a string)', () => {
        expect(() => {
            userStorage.saveUserToken('fakeData')
        }).toThrow(TypeError('userData has to be an Object instance'))
    })

    it('should fail on saving user when data is a boolean)', () => {
        expect(() => {
            userStorage.saveUserToken(true)
        }).toThrow(TypeError('userData has to be an Object instance'))
    })

    it('should fail on saving user when data is a function)', () => {
        expect(() => {
            userStorage.saveUserToken(function(){})
        }).toThrow(TypeError('userData has to be an Object instance'))
    })

    it('should delete user data', () => {
        userStorage.deleteUserToken()
        expect(userStorage.auth).toBe(null)
    })
})
