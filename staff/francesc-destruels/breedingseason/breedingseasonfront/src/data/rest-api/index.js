import validate from '../../common/validate'
import call from '../../common/call'

const restApi = {
    __url__: 'http://localhost:8080',
    __timeout__: 0,

    create(nickname, age, email, password) { // my way
        ow(nickname, ow.string.not.empty)
        ow(age, ow.number.is(x => x > 13))
        ow(email, ow.string.not.empty)
        ow(password, ow.string.not.empty)

        return call(`${this.__url__}/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nickname, age, email, password }),
            timeout: this.__timeout__
        })
    },

    authenticate(nicknameOEmail, password) { // my way
        ow(nicknameOEmail, ow.string.not.empty)
        ow(password, ow.string.not.empty)

        return call(`${this.__url__}/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nicknameOEmail, password }),
            timeout: this.__timeout__
        })
    },

    retrieveUser(token) { // my way
        ow(token, ow.string.not.empty)

        return call(`${this.__url__}/user`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
    },

    //retrieveUser game history
    //StartGame
    //Send Next Action
    //Update
    //Join Game
}

export default restApi