import call from '../../common/call'
import ow from 'ow'

const restApi = {
    __url__: 'http://localhost:7000/api',
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
        }).then(response => response.json())
    },

    authenticate(nicknameOEmail, password) { // my way
        ow(nicknameOEmail, ow.string.not.empty)
        ow(password, ow.string.not.empty)

        return call(`${this.__url__}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nicknameOEmail, password }),
            timeout: this.__timeout__
        }).then(response => response.json())
    },

    retrieveUser(token) { // my way
        ow(token, ow.string.not.empty)

        return call(`${this.__url__}/user`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        }).then(response => response.json())
    },

    retrieveUserGameHistory(token) { // my way
        ow(token, ow.string.not.empty)

        return call(`${this.__url__}/user/gamedata`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
    },

    newGame(token, style, privateGame) { // my way
        ow(token, ow.string.not.empty)
        ow(style, ow.object.exactShape({
            mode: ow.string,
            playersNumber: ow.number,
        }))
        ow(privateGame, ow.boolean) // Hay que recojer el GameiD en la logica

        return call(`${this.__url__}/newGame`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ style, privateGame }),
            timeout: this.__timeout__
        }).then(response => response.json())
    },

    // joinGame(token, gameId) { // my way
    //     ow(token, ow.string.not.empty)

    //     return call(`${this.__url__}/joinGame/${gameId}`, {
    //         headers: { Authorization: `Bearer ${token}` },
    //         timeout: this.__timeout__
    //     })
    // },

    startGame(token, gameId) { // my way
        ow(token, ow.string.not.empty)
        ow(gameId, ow.string.not.empty)

        return call(`${this.__url__}/startGame/${gameId}`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        }).then(response => response.json())
    },

    // updateGame(token, gameId) { // my way
    //     ow(token, ow.string.not.empty)
    //     ow(gameId, ow.string.not.empty)

    //     return call(`${this.__url__}/updateGame/${gameId}`, {
    //         headers: { Authorization: `Bearer ${token}` },
    //         timeout: this.__timeout__
    //     })
    // },

    gameAction(token, gameId, gamePlay) {
        ow(token, ow.string.not.empty)
        ow(gamePlay, ow.object)
        ow(gameId, ow.string.not.empty)

        return call(`${this.__url__}/continueGame/${gameId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ gamePlay }),
            timeout: this.__timeout__
        }).then(response => response.json())
    },

}

export default restApi